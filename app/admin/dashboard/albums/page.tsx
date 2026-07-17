import Link from "next/link";
import { db } from "@/lib/db";
import {
  deleteAlbumAction,
  syncAlbumPhotoCountAction,
} from "@/lib/actions/albums";
import { DeleteButton } from "@/components/ui/delete-button";

interface AlbumsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminAlbumsPage({
  searchParams,
}: AlbumsPageProps) {
  const { q } = await searchParams;

  const albums = await db.album.findMany({
    where: q ? { title: { contains: q, mode: "insensitive" } } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">
          Albums
        </h1>
        <Link
          href="/admin/dashboard/albums/new"
          className="px-4 py-2 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold"
        >
          + New Album
        </Link>
      </div>

      <form className="max-w-sm">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title..."
          className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
        />
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
          <thead>
            <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Year</th>
              <th className="p-2">Location</th>
              <th className="p-2">Cloudinary Folder</th>
              <th className="p-2">Photos</th>
              <th className="p-2" />
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="border-b border-[#2e3a28]/5">
                <td className="p-2 font-bold">{album.title}</td>
                <td className="p-2">{album.category}</td>
                <td className="p-2">{album.year}</td>
                <td className="p-2">{album.location}</td>
                <td className="p-2">{album.cloudinaryFolder}</td>
                <td className="p-2">{album.photoCount}</td>
                <td className="p-2">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/dashboard/albums/${album.id}`}
                      className="text-[#2e3a28] font-bold"
                    >
                      Edit
                    </Link>
                    <form
                      action={syncAlbumPhotoCountAction.bind(null, album.id)}
                    >
                      <button
                        type="submit"
                        className="text-text-muted hover:text-[#2e3a28] cursor-pointer"
                      >
                        Sync
                      </button>
                    </form>
                    <form action={deleteAlbumAction.bind(null, album.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {albums.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-text-muted">
                  No albums yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
