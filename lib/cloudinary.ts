import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// --- Existing Gallery Logic ---

export interface AlbumPhoto {
  id: string;
  url: string;
  fullSizeUrl: string;
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
      const getTransformedUrl = (transformations: string) => {
        return originalUrl.replace(/\/upload\/(v\d+\/)?/, `/upload/${transformations}/$1`);
      };

      return {
        id: resource.public_id,
        url: getTransformedUrl("f_auto,q_auto,w_800,c_limit"),
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

export function getOptimizedCloudinaryUrl(url: string, width: number = 800): string {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace(/\/upload\/(v\d+\/)?/, `/upload/f_auto,q_auto,w_${width},c_limit/$1`);
}

// --- NEW: Registration Receipt Upload Logic ---

/**
 * Uploads a membership receipt to /unds/payments/<name>
 */
export async function uploadReceiptToCloudinary(
  file: File,
  firstName: string,
  lastName: string,
  email: string
): Promise<string> {
  // Normalize naming: lowercase, underscores, remove invalid chars
  const safeFilename = `${firstName}_${lastName}_${email}`
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");

  // Convert File to buffer for the upload stream
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "unds/payments", // Forces the directory structure
        public_id: safeFilename, // Handles the renaming
        resource_type: "auto",  // Handles PDF, JPG, PNG
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload failed: No result returned from Cloudinary"));
        }
      }
    ).end(buffer);
  });
}