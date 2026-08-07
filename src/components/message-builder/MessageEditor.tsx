"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/FormField";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface MessageEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

/** Editable message preview with a self-contained copy-to-clipboard action. */
export function MessageEditor({
  value,
  onChange,
  label = "Message",
}: MessageEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleChange = (next: string) => {
    onChange(next);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <Textarea
        aria-label={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        rows={6}
      />
      <Button onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy message
          </>
        )}
      </Button>
    </div>
  );
}
