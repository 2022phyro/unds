"use client";

import { useActionState } from "react";
import { createAlbumAction, type AlbumActionState } from "@/lib/actions/albums";
import { FormField } from "@/app/admin/dashboard/_components/form-field";

const initialState: AlbumActionState = {};

export default function NewAlbumPage() {
  const [state, formAction, isPending] = useActionState(createAlbumAction, initialState);

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">New Album</h1>
      <form action={formAction} className="space-y-4">
        <FormField label="Slug" name="slug" placeholder="varsity-open-2026" required />
        <div className="space-y-1">
          <label className="font-ui text-[10px] tracking-widest text-text-muted">CATEGORY</label>
          <select name="category" className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope">
            <option value="TOURNAMENTS">TOURNAMENTS</option>
            <option value="TRAININGS">TRAININGS</option>
            <option value="SOCIALS">SOCIALS</option>
            <option value="AWARDS">AWARDS</option>
          </select>
        </div>
        <FormField label="Year" name="year" type="number" placeholder="2026" required />
        <FormField label="Title" name="title" required />
        <FormField label="Subtitle" name="subtitle" required />
        <FormField label="Date String" name="dateString" placeholder="OCTOBER 2026" required />
        <FormField label="Location" name="location" placeholder="MAIN AUDITORIUM" required />
        <FormField label="Cover Image URL" name="imageUrl" required />
        <FormField label="Cloudinary Folder" name="cloudinaryFolder" placeholder="gallery/2026-varsity" required />
        <FormField label="Institutions (comma-separated)" name="institutions" placeholder="UNN, UI, UNILAG" />

        {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-3 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Create Album"}
        </button>
      </form>
    </div>
  );
}
