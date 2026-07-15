  "use server";

  import { revalidatePath } from "next/cache";
  import { redirect } from "next/navigation";
  import { db } from "@/lib/db";
  import { getSession, isAuthorizedStaff } from "@/lib/auth/session";
  import { getFolderPhotoCount } from "@/lib/cloudinary";
  import { albumSchema } from "@/lib/validations/albumSchema";

  export interface AlbumActionState {
    error?: string;
  }

  async function requireStaff() {
    const session = await getSession();
    if (!isAuthorizedStaff(session)) {
      throw new Error("Not authorized.");
    }
    return session;
  }

  export async function createAlbumAction(
    _prevState: AlbumActionState,
    formData: FormData,
  ): Promise<AlbumActionState> {
    await requireStaff();

    const parsed = albumSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid album data." };
    }

    await db.album.create({ data: parsed.data });

    revalidatePath("/admin/dashboard/albums");
    revalidatePath("/gallery");
    redirect("/admin/dashboard/albums");
  }

  export async function updateAlbumAction(
    albumId: string,
    _prevState: AlbumActionState,
    formData: FormData,
  ): Promise<AlbumActionState> {
    await requireStaff();

    const parsed = albumSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid album data." };
    }

    await db.album.update({ where: { id: albumId }, data: parsed.data });

    revalidatePath("/admin/dashboard/albums");
    revalidatePath(`/gallery/${parsed.data.slug}`);
    revalidatePath("/gallery");
    redirect("/admin/dashboard/albums");
  }

  export async function deleteAlbumAction(albumId: string) {
    await requireStaff();
    await db.album.delete({ where: { id: albumId } });
    revalidatePath("/admin/dashboard/albums");
    revalidatePath("/gallery");
  }

  export async function syncAlbumPhotoCountAction(albumId: string) {
    await requireStaff();
    const album = await db.album.findUniqueOrThrow({ where: { id: albumId } });
    const photoCount = await getFolderPhotoCount(album.cloudinaryFolder);
    await db.album.update({ where: { id: albumId }, data: { photoCount } });
    revalidatePath("/admin/dashboard/albums");
    revalidatePath(`/gallery/${album.slug}`);
    revalidatePath("/gallery");
  }
