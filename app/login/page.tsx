"use client";

import { useActionState } from "react";
import { loginAdminAction, type LoginActionState } from "@/lib/actions/auth";

const initialState: LoginActionState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, initialState);

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-24 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-garamond text-3xl font-light tracking-wide text-[#2e3a28]">
          Staff Sign In
        </h1>
        <p className="font-manrope text-xs text-text-secondary">
          Restricted to UNDS staff and administrators.
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="font-ui text-[10px] tracking-widest text-text-muted">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xs border border-[#2e3a28]/20 bg-white px-4 py-2.5 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
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
            className="w-full rounded-xs border border-[#2e3a28]/20 bg-white px-4 py-2.5 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
          />
        </div>
        {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-5 py-3 bg-[#2e3a28] text-[#fcfbf9] text-xs font-ui tracking-wider font-bold transition-colors hover:bg-[#1f281b] disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
