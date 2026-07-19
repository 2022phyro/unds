import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getAlbumPhotos } from "@/lib/cloudinary";
import AlbumLightboxClient from "./album-lightbox-client";

interface AlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumDetailsPage({ params }: AlbumPageProps) {
  const { albumId } = await params;

  const album = await db.album.findUnique({ where: { slug: albumId } });
  if (!album) notFound();

  const photos = await getAlbumPhotos(album.cloudinaryFolder);

  return (
    <div className="w-full text-text-primary min-h-screen font-manrope text-left">
      <div className="flex flex-col gap-3 mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">

        {/* ─── BACK NAVIGATION BAR ────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs font-ui  font-bold tracking-widest text-text-muted border w-40 p-2">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2  text-[11px] font-ui tracking-wider text-text-muted hover:text-[#2e3a28] transition-colors"
          >
            &larr; Return to Albums
          </Link>
        </div>
        <div className="space-y-1 mt-3">
          <span className="text-[10px]  text-text-muted font-ui tracking-widest block">
            {album.location} // {album.dateString}
          </span>
          <h3 className="text-3xl sm:text-4xl font-light text-text-primary font-ui tracking-tight">
            {album.title}
          </h3>
        </div>

        <AlbumLightboxClient photos={photos} title={album.title} location={album.location} />
      </div>
    </div>
  );
}
