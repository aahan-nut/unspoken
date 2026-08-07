import { FieldWrapper, Input, Select } from "@/components/ui/FormField";
import {
  ageGroupOptions,
  languageOptions,
  modalityOptions,
  resourceCategories,
} from "@/data/mockResources";
import type { AgeGroup, ResourceModality, SupportCategory } from "@/types/resource";

export interface ResourceFilterState {
  location: string;
  modality: "all" | ResourceModality;
  category: "all" | SupportCategory;
  ageGroup: "all" | AgeGroup;
  language: string;
  freeOnly: boolean;
  insuranceOnly: boolean;
}

export const defaultResourceFilters: ResourceFilterState = {
  location: "",
  modality: "all",
  category: "all",
  ageGroup: "all",
  language: "all",
  freeOnly: false,
  insuranceOnly: false,
};

interface ResourceFiltersProps {
  filters: ResourceFilterState;
  onChange: (patch: Partial<ResourceFilterState>) => void;
  onClear: () => void;
  /** Distinguishes ids between the desktop sidebar and mobile drawer instances, which are both mounted at once. */
  idPrefix?: string;
}

export function ResourceFilters({
  filters,
  onChange,
  onClear,
  idPrefix = "filter",
}: ResourceFiltersProps) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className="space-y-5">
      <FieldWrapper label="ZIP code or city" htmlFor={id("location")}>
        <Input
          id={id("location")}
          placeholder="e.g. 78701 or Austin, TX"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </FieldWrapper>

      <FieldWrapper label="In-person or virtual" htmlFor={id("modality")}>
        <Select
          id={id("modality")}
          value={filters.modality}
          onChange={(e) =>
            onChange({ modality: e.target.value as ResourceFilterState["modality"] })
          }
        >
          {modalityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Type of support" htmlFor={id("category")}>
        <Select
          id={id("category")}
          value={filters.category}
          onChange={(e) =>
            onChange({ category: e.target.value as ResourceFilterState["category"] })
          }
        >
          {resourceCategories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Age group" htmlFor={id("age")}>
        <Select
          id={id("age")}
          value={filters.ageGroup}
          onChange={(e) =>
            onChange({ ageGroup: e.target.value as ResourceFilterState["ageGroup"] })
          }
        >
          {ageGroupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Language" htmlFor={id("language")}>
        <Select
          id={id("language")}
          value={filters.language}
          onChange={(e) => onChange({ language: e.target.value })}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      <div className="space-y-3">
        <label
          htmlFor={id("free-only")}
          className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
        >
          <input
            id={id("free-only")}
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary"
            checked={filters.freeOnly}
            onChange={(e) => onChange({ freeOnly: e.target.checked })}
          />
          Free or low-cost only
        </label>
        <label
          htmlFor={id("insurance-only")}
          className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
        >
          <input
            id={id("insurance-only")}
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary"
            checked={filters.insuranceOnly}
            onChange={(e) => onChange({ insuranceOnly: e.target.checked })}
          />
          Insurance accepted
        </label>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
      >
        Clear all filters
      </button>
    </div>
  );
}
