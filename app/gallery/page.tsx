import { db } from "@/lib/db";
import GalleryRegistryClient, { type AlbumMeta } from "./gallery-registry-client";

export const revalidate = 86400;

export default async function GalleryExhibitionPage() {
  const albums = await db.album.findMany({ orderBy: { year: "desc" } });

  const albumMetas: AlbumMeta[] = albums.map((album) => ({
    id: album.slug,
    category: album.category,
    year: album.year,
    title: album.title,
    subtitle: album.subtitle,
    dateString: album.dateString,
    photoCount: album.photoCount,
    location: album.location,
    imageUrl: album.imageUrl,
    institutions: album.institutions,
  }));

  return <GalleryRegistryClient albums={albumMetas} />;
}
