"use client";

import { useActionState } from "react";
import {
  subscribeNewsletterAction,
  type NewsletterActionState,
} from "@/lib/actions/newsletter";

const initialState: NewsletterActionState = {};

interface NewsletterFormProps {
  source: string;
  className?: string;
}

export function NewsletterForm({
  source,
  className = "",
}: NewsletterFormProps) {
  const boundAction = subscribeNewsletterAction.bind(null, source);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  if (state.success) {
    return (
      <p
        className={`text-xs font-manrope text-[#2e3a28] font-bold ${className}`}
      >
        You're all set! Keep an eye on your inbox for upcoming events,
        opportunities, and society updates.
      </p>
    );
  }

  return (
    <div className={className}>
      <form
        action={formAction}
        className="flex items-stretch w-full border border-[#2e3a28] rounded-xs overflow-hidden"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          required
          className="flex-1 px-4 py-2.5 text-xs font-manrope bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border-0 focus:outline-hidden text-text-primary"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-5 btn btn-primary rounded-xs! text-xs font-garamond!  tracking-wider font-bold transition-colors hover:bg-[#1f281b] disabled:opacity-50"
        >
          {isPending ? "..." : "Subscribe"}
        </button>
      </form>
      {state.error && (
        <p className="text-xs font-manrope text-red-700 mt-2 text-center">
          {state.error}
        </p>
      )}
    </div>
  );
}
