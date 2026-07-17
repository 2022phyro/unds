import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  deleteAlbumAction,
  syncAlbumPhotoCountAction,
} from "@/lib/actions/albums";
import EditAlbumForm from "./edit-album-form";
import { DeleteButton } from "@/components/ui/delete-button";

interface EditAlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { id } = await params;
  const album = await db.album.findUnique({ where: { id } });
  if (!album) notFound();

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">
          Edit Album
        </h1>
        <div className="flex gap-4 text-xs font-ui tracking-wider">
          <form action={syncAlbumPhotoCountAction.bind(null, album.id)}>
            <button
              type="submit"
              className="text-text-muted hover:text-[#2e3a28] cursor-pointer"
            >
              Sync Photo Count
            </button>
          </form>
          <form
            action={deleteAlbumAction.bind(
              null,
              album.id
            )}
          >
            <DeleteButton />
          </form>
        </div>
      </div>
      <EditAlbumForm album={album} />
    </div>
  );
}
