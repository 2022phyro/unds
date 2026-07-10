"use client";

import { useActionState } from "react";
import { loginAdminAction, type LoginActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/bookmark-button";

const initialState: LoginActionState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-24 space-y-8">
      <div className="space-y-2 text-center flex flex-col gap-3">
        <h1 className="font-garamond text-3xl font-light tracking-wide]">
          Staff Sign In
        </h1>
        <p className="font-manrope text-xs text-text-secondary">
          Restricted to UNDS staff and administrators.
        </p>
      </div>
      <form action={formAction} className="space-y-4 flex flex-col gap-4">
        <div className="space-y-1">
          <label htmlFor="email" className="font-ui text-[10px] tracking-widest text-text-muted">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xs border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  px-4 py-2.5 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="font-ui text-[10px] tracking-widest text-text-muted">
            PASSWORD
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-xs border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  px-4 py-2.5 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
          />
        </div>
        {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full px-5 py-3 btn btn-primary text-[#fcfbf9] text-xs font-ui tracking-wider font-bold transition-colors hover:bg-[#1f281b] disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
