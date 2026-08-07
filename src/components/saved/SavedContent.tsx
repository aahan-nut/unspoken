"use client";

import { PageContainer, SectionHeading } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { FieldWrapper, Select, Textarea } from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";
import { resources, savedStatusOptions } from "@/data/mockResources";
import { createClient } from "@/lib/supabase/client";
import { findLabel } from "@/lib/utils";
import type { SavedResourceRow, SavedStatus } from "@/types/resource";
import {
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

interface SavedContentProps {
  initialEntries: SavedResourceRow[];
  initialError?: string | null;
}

export function SavedContent({ initialEntries, initialError = null }: SavedContentProps) {
  const { showToast } = useToast();
  const supabase = useMemo(() => createClient(), []);

  const [entries, setEntries] = useState<SavedResourceRow[]>(initialEntries);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pendingRemove, setPendingRemove] = useState<{ id: string; title: string } | null>(
    null
  );
  const lastSyncedNotes = useRef(
    new Map(initialEntries.map((entry) => [entry.id, entry.private_notes]))
  );

  const handleStatusChange = async (id: string, status: SavedStatus) => {
    setErrorMessage(null);
    setSavingId(id);

    const { data, error } = await supabase
      .from("saved_resources")
      .update({ status })
      .eq("id", id)
      .select("id, resource_id, status, private_notes, created_at, updated_at")
      .single();

    if (error) {
      setErrorMessage("Couldn't update the status. Please try again.");
    } else if (data) {
      setEntries((prev) => prev.map((entry) => (entry.id === id ? (data as SavedResourceRow) : entry)));
      const label = findLabel(savedStatusOptions, status);
      showToast(`Status updated${label ? ` to "${label}"` : ""}`);
    }

    setSavingId(null);
  };

  const handleNoteChange = (id: string, note: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, private_notes: note } : entry))
    );
  };

  const handleNoteBlur = async (id: string, note: string) => {
    if (lastSyncedNotes.current.get(id) === note) return;

    const { error } = await supabase
      .from("saved_resources")
      .update({ private_notes: note })
      .eq("id", id);

    if (error) {
      setErrorMessage("Couldn't save your note. Please try again.");
    } else {
      lastSyncedNotes.current.set(id, note);
      showToast("Note saved");
    }
  };

  const handleConfirmRemove = async () => {
    if (!pendingRemove) return;
    setErrorMessage(null);

    const { error } = await supabase
      .from("saved_resources")
      .delete()
      .eq("id", pendingRemove.id);

    if (error) {
      setErrorMessage("Couldn't remove this resource. Please try again.");
    } else {
      setEntries((prev) => prev.filter((entry) => entry.id !== pendingRemove.id));
      showToast(`Removed "${pendingRemove.title}" from saved resources`);
    }
  };

  const handleCopyPhone = async (id: string, phone: string) => {
    await navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
  };

  interface SavedDisplayRow {
    entry: SavedResourceRow;
    title: string;
    description: string;
    isExternal: boolean;
    phone?: string;
    url?: string;
    mapsUrl?: string | null;
  }

  const rows: SavedDisplayRow[] = entries.flatMap((entry): SavedDisplayRow[] => {
    if (entry.source === "google_places") {
      return [
        {
          entry,
          title: entry.external_name ?? "Saved listing",
          description: entry.external_address ?? "No address on file.",
          isExternal: true,
          mapsUrl: entry.external_maps_url,
        },
      ];
    }

    const resource = resources.find((r) => r.id === entry.resource_id);
    if (!resource) return [];

    return [
      {
        entry,
        title: resource.title,
        description: resource.description,
        isExternal: false,
        phone: resource.phone,
        url: resource.url,
      },
    ];
  });

  return (
    <PageContainer narrow>
      <SectionHeading
        level="h1"
        title="Saved resources"
        description="Resources you've saved, plus your own status and private notes."
      />

      {errorMessage && (
        <Alert variant="error" title="Something went wrong" className="mb-6">
          {errorMessage}
        </Alert>
      )}

      {rows.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved resources yet"
          description="Save resources from the Find Support page to track and add notes here."
          actionLabel="Browse resources"
          actionHref="/resources"
        />
      ) : (
        <div className="space-y-5">
          {rows.map(({ entry, title, description, isExternal, phone, url, mapsUrl }) => (
            <Card key={entry.id} padding="md">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-foreground">{title}</h2>
                    {isExternal && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted">
                        <MapPin className="h-3 w-3" />
                        Nearby listing
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                  <p className="mt-2 text-xs text-muted/80">
                    Saved {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingRemove({ id: entry.id, title })}
                  aria-label={`Remove ${title} from saved`}
                  className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <FieldWrapper label="Status" htmlFor={`status-${entry.id}`}>
                  <Select
                    id={`status-${entry.id}`}
                    value={entry.status}
                    disabled={savingId === entry.id}
                    onChange={(e) =>
                      handleStatusChange(entry.id, e.target.value as SavedStatus)
                    }
                  >
                    {savedStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FieldWrapper>
              </div>

              <div className="mb-4">
                <FieldWrapper
                  label="Private note"
                  htmlFor={`note-${entry.id}`}
                  hint="Only visible to you. Saved when you click away from this field."
                >
                  <Textarea
                    id={`note-${entry.id}`}
                    placeholder="e.g. Call after 3pm, mentioned they take walk-ins..."
                    value={entry.private_notes}
                    onChange={(e) => handleNoteChange(entry.id, e.target.value)}
                    onBlur={(e) => handleNoteBlur(entry.id, e.target.value)}
                    rows={3}
                  />
                </FieldWrapper>
              </div>

              <div className="flex flex-wrap gap-2">
                {phone && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPhone(entry.id, phone)}
                  >
                    {copiedId === entry.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy phone number
                      </>
                    )}
                  </Button>
                )}
                {phone && (
                  <Button variant="outline" size="sm" href={`tel:${phone}`}>
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </Button>
                )}
                {url && (
                  <Button variant="outline" size="sm" href={url}>
                    Open website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
                {isExternal && mapsUrl && (
                  <Button variant="outline" size="sm" href={mapsUrl}>
                    View on Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              {isExternal && (
                <p className="mt-3 text-xs text-muted/80">
                  Contact provider directly to confirm cost, insurance, and eligibility.
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={pendingRemove !== null}
        onClose={() => setPendingRemove(null)}
        onConfirm={handleConfirmRemove}
        title="Remove saved resource?"
        description={
          pendingRemove
            ? `"${pendingRemove.title}" and its status/notes will be removed from your saved list. This can't be undone, but you can save it again later.`
            : ""
        }
        confirmLabel="Remove"
        destructive
      />
    </PageContainer>
  );
}
