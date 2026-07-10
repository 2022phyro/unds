import { FormField } from "@/app/admin/dashboard/_components/form-field";
import { ScheduleEditor } from "./schedule-editor";
import { FaqEditor } from "./faq-editor";
import type { TournamentConfig } from "@prisma/client";
import type { ScheduleSlot, FaqEntry } from "@/lib/view-models/events";

interface TournamentFormFieldsProps {
  tournament?: TournamentConfig;
}

export function TournamentFormFields({ tournament }: TournamentFormFieldsProps) {
  const schedule = (tournament?.schedule as unknown as ScheduleSlot[]) ?? [];
  const faqs = (tournament?.faqs as unknown as FaqEntry[]) ?? [];

  return (
    <>
      <FormField label="Slug" name="slug" defaultValue={tournament?.slug} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Type"
          name="type"
          defaultValue={tournament?.type ?? "INTERNAL_HOST"}
          options={["INTERNAL_HOST", "EXTERNAL_MAJOR", "RECURRING_LOOP"]}
        />
        <SelectField
          label="Status"
          name="status"
          defaultValue={tournament?.status ?? "REGISTRATION_OPEN"}
          options={["REGISTRATION_OPEN", "REGISTRATION_LOCKED", "COMPLETED", "ONGOING", "CLOSING_SOON"]}
        />
      </div>
      <FormField
        label="Status Text"
        name="statusText"
        defaultValue={tournament?.statusText}
        placeholder="Applications open • Closes in 18 days"
        required
      />
      <FormField label="Scope Text" name="scopeText" defaultValue={tournament?.scopeText} placeholder="Open to everyone" required />
      <FormField label="Title" name="title" defaultValue={tournament?.title} required />
      <div className="space-y-1">
        <label className="font-ui text-[10px] tracking-widest text-text-muted">DESCRIPTION</label>
        <textarea
          name="description"
          defaultValue={tournament?.description}
          rows={4}
          required
          className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Debate Format" name="debateFormat" defaultValue={tournament?.debateFormat} placeholder="BRITISH PARLIAMENTARY" required />
        <SelectField
          label="Delivery Mode"
          name="deliveryMode"
          defaultValue={tournament?.deliveryMode ?? "OFFLINE"}
          options={["ONLINE", "OFFLINE", "HYBRID"]}
        />
      </div>
      <FormField label="Location" name="location" defaultValue={tournament?.location} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Date String" name="dateString" defaultValue={tournament?.dateString} placeholder="OCT 22-25, 2026" required />
        <FormField
          label="Sort Date"
          name="sortDate"
          type="date"
          defaultValue={tournament?.sortDate ? tournament.sortDate.toISOString().slice(0, 10) : undefined}
          required
        />
      </div>
      <FormField
        label="Deadline Text (optional)"
        name="deadlineText"
        defaultValue={tournament?.deadlineText ?? undefined}
        placeholder="Applications close Oct 10"
      />
      <FormField
        label="Registration URL (optional, for reposted events)"
        name="registrationUrl"
        defaultValue={tournament?.registrationUrl ?? undefined}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Registration Type"
          name="registrationType"
          defaultValue={tournament?.registrationType ?? "NONE"}
          options={["NONE", "INDIVIDUAL", "TEAM"]}
        />
        <SelectField
          label="Adjudicator Policy"
          name="adjudicatorPolicy"
          defaultValue={tournament?.adjudicatorPolicy ?? "NONE"}
          options={["N_PLUS_ONE", "FIXED", "NONE"]}
        />
      </div>
      <FormField
        label="Fixed Adjudicator Count (if policy = FIXED)"
        name="fixedAdjudicatorCount"
        type="number"
        defaultValue={tournament?.fixedAdjudicatorCount ?? undefined}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#2e3a28]/10 pt-4">
        <label className="flex items-center gap-2 text-xs font-manrope">
          <input type="checkbox" name="includesPS" defaultChecked={tournament?.includesPS} />
          Tournament includes Public Speaking
        </label>
        <label className="flex items-center gap-2 text-xs font-manrope">
          <input type="checkbox" name="psAdjudicatorsAllowed" defaultChecked={tournament?.psAdjudicatorsAllowed} />
          Allow independent adjudicators to register for Public Speaking
        </label>
      </div>
      <div className="space-y-1">
        <label className="font-ui text-[10px] tracking-widest text-text-muted">WHO SHOULD ATTEND (one per line)</label>
        <textarea
          name="whoShouldAttend"
          defaultValue={tournament?.whoShouldAttend.join("\n")}
          rows={3}
          className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
        />
      </div>
      <div className="space-y-1">
        <label className="font-ui text-[10px] tracking-widest text-text-muted">SCHEDULE</label>
        <ScheduleEditor name="schedule" initialRows={schedule} />
      </div>
      <div className="space-y-1">
        <label className="font-ui text-[10px] tracking-widest text-text-muted">FAQS</label>
        <FaqEditor name="faqs" initialRows={faqs} />
      </div>
      <label className="flex items-center gap-2 text-xs font-manrope">
        <input type="checkbox" name="isFeatured" defaultChecked={tournament?.isFeatured} />
        Featured on /events
      </label>
    </>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <div className="space-y-1">
      <label className="font-ui text-[10px] tracking-widest text-text-muted">{label.toUpperCase()}</label>
      <select name={name} defaultValue={defaultValue} className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
