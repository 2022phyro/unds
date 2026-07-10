"use client";

import { useActionState } from "react";
import type { Album } from "@prisma/client";
import { updateAlbumAction, type AlbumActionState } from "@/lib/actions/albums";
import { FormField } from "@/app/admin/dashboard/_components/form-field";

const initialState: AlbumActionState = {};

export default function EditAlbumForm({ album }: { album: Album }) {
  const updateWithId = updateAlbumAction.bind(null, album.id);
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FormField label="Slug" name="slug" defaultValue={album.slug} required />
      <div className="space-y-1">
        <label className="font-ui text-[10px] tracking-widest text-text-muted">CATEGORY</label>
        <select
          name="category"
          defaultValue={album.category}
          className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope"
        >
          <option value="TOURNAMENTS">TOURNAMENTS</option>
          <option value="TRAININGS">TRAININGS</option>
          <option value="SOCIALS">SOCIALS</option>
          <option value="AWARDS">AWARDS</option>
        </select>
      </div>
      <FormField label="Year" name="year" type="number" defaultValue={album.year} required />
      <FormField label="Title" name="title" defaultValue={album.title} required />
      <FormField label="Subtitle" name="subtitle" defaultValue={album.subtitle} required />
      <FormField label="Date String" name="dateString" defaultValue={album.dateString} required />
      <FormField label="Location" name="location" defaultValue={album.location} required />
      <FormField label="Cover Image URL" name="imageUrl" defaultValue={album.imageUrl} required />
      <FormField label="Cloudinary Folder" name="cloudinaryFolder" defaultValue={album.cloudinaryFolder} required />
      <FormField
        label="Institutions (comma-separated)"
        name="institutions"
        defaultValue={album.institutions.join(", ")}
      />

      {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-3 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
