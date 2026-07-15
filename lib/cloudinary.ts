import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface AlbumPhoto {
  id: string;
  url: string;        // Optimized for the gallery grid layout
  fullSizeUrl: string; // Optimized for full-screen lightbox viewing
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

/** 
 * Fetches album photos with credit-saving automatic optimizations.
 * Transforms URLs to strip away heavy data overhead.
 */
export async function getAlbumPhotos(folder: string): Promise<AlbumPhoto[]> {
  try { 
    const result = await cloudinary.search
      .expression(`folder="${folder}/*"`)
      .max_results(500)
      .with_field('context')
      .execute();

    const resources: CloudinaryResource[] = result.resources ?? [];
    return resources.map((resource) => {
      const custom = resource.context?.custom ?? {};
      
      const originalUrl = resource.secure_url;
      
      // Safety: Use a robust Regex to inject transformations right after "/upload/"
      // This preserves any version parameters (e.g., /upload/v12345/...) safely!
      const getTransformedUrl = (transformations: string) => {
        return originalUrl.replace(/\/upload\/(v\d+\/)?/, `/upload/${transformations}/$1`);
      };

      return {
        id: resource.public_id,
        // Grid thumbnail: optimized format, automatic quality, and scaled down to 800px width
        url: getTransformedUrl("f_auto,q_auto,w_800,c_limit"),
        // Lightbox view: high-res desktop boundary limits (1600px max)
        fullSizeUrl: getTransformedUrl("f_auto,q_auto,w_1600,c_limit"),
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
/** 
 * Fixed photo counter using search expressions instead of the finicky Admin API.
 */
export async function getFolderPhotoCount(folder: string): Promise<number> {
  try {
    const result = await cloudinary.search
      .expression(`folder="${folder}/*"`)
      .max_results(500)
      .execute();
      
    return (result.resources ?? []).length;
  } catch (error) {
    console.error(`Failed to count Cloudinary photos for folder "${folder}":`, error);
    return 0;
  }
}

// Helper to transform any Cloudinary image url on the fly
export function getOptimizedCloudinaryUrl(url: string, width: number = 800): string {
  if (!url.includes("cloudinary.com")) return url; // Fallback for raw unsplash links
  return url.replace(/\/upload\/(v\d+\/)?/, `/upload/f_auto,q_auto,w_${width},c_limit/$1`);
}