import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface AlbumPhoto {
  id: string;
  url: string;
  speaker: string;
  context: string;
  isLarge: boolean;
}

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  context?: { custom?: Record<string, string> };
}

/** Folder-as-album strategy: photos + captions come straight from Cloudinary context metadata, no per-asset DB rows. */
export async function getAlbumPhotos(folder: string): Promise<AlbumPhoto[]> {
  console.log("Booyakhjfdhjhf")
  try {
  const result = await cloudinary.search
    .expression(`folder="${folder}/*"`) // Matches the real path structure
    .max_results(500)
    .with_field('context')                  // CRITICAL: Tells Cloudinary to return context data
    .execute();

    const resources: CloudinaryResource[] = result.resources ?? [];
    return resources.map((resource) => {
      const custom = resource.context?.custom ?? {};
      return {
        id: resource.public_id,
        url: resource.secure_url,
        speaker: custom.speaker ?? "",
        context: custom.context ?? custom.caption ?? "",
        isLarge: resource.width > resource.height,
      };
    });
  } catch (error) {
    console.error(`Failed to fetch Cloudinary photos for folder "${folder}":`, error);
    return [];
  }
}

export async function getFolderPhotoCount(folder: string): Promise<number> {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500,
    });
    return (result.resources ?? []).length;
  } catch (error) {
    console.error(`Failed to count Cloudinary photos for folder "${folder}":`, error);
    return 0;
  }
}
