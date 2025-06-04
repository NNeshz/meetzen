import { supabaseS3 } from "@meetzen/s3/index";
import sharp from "sharp";

type ImageFolder = "company";

const MAX_SIZE_KB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

class ImageServiceError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "ImageServiceError";
  }
}

export class ImageService {
  static getPublicImageUrl(imagePath: string): string {
    // Si ya es una URL completa, devolverla tal como está
    if (imagePath.includes('storage/v1/object/public/meetzen/')) {
      return imagePath;
    }

    // Si contiene storage/v1/s3/, extraer solo el path después de meetzen/
    if (imagePath.includes('storage/v1/s3/')) {
      const pathParts = imagePath.split('storage/v1/s3/');
      const fullPath = pathParts[1] || imagePath;
      
      // Extraer solo la parte después de meetzen/ si existe
      if (fullPath.includes('meetzen/')) {
        const meetzenParts = fullPath.split('meetzen/');
        imagePath = meetzenParts[1] || fullPath;
      } else {
        imagePath = fullPath;
      }
    }

    // Generar URL pública usando el endpoint público de Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (!supabaseUrl) {
      throw new ImageServiceError("Supabase URL is not configured");
    }

    return `${supabaseUrl}/storage/v1/object/public/meetzen/${imagePath}`;
  }

  static extractImagePath(imageUrl: string): string {
    if (!imageUrl) return '';
    
    // Si es una URL completa, extraer solo el path relativo
    if (imageUrl.includes('storage/v1/object/public/meetzen/')) {
      const pathParts = imageUrl.split('storage/v1/object/public/meetzen/');
      return pathParts[1] || imageUrl;
    }
    
    if (imageUrl.includes('storage/v1/s3/')) {
      const pathParts = imageUrl.split('storage/v1/s3/');
      const fullPath = pathParts[1] || imageUrl;
      
      // Si contiene meetzen/, extraer solo la parte después
      if (fullPath.includes('meetzen/')) {
        const meetzenParts = fullPath.split('meetzen/');
        return meetzenParts[1] || fullPath;
      }
      
      return fullPath;
    }

    return imageUrl;
  }

  async createImage(image: File, userId: string, folder: ImageFolder) {
    try {
      if (!image) {
        throw new ImageServiceError("Image file is required");
      }
      if (!userId) {
        throw new ImageServiceError("User ID is required");
      }

      const fileName = `${userId}-${Date.now()}.webp`;
      const filePath = `${folder}/${fileName}`;

      try {
        const compressedBuffer = await this.compressToWebp(image);
        const uint8Array = new Uint8Array(compressedBuffer);

        const writeResult = await supabaseS3.write(filePath, uint8Array);
        if (!writeResult) {
          throw new ImageServiceError("Failed to upload image to storage");
        }

        // Generar URL pública en lugar de la URL interna
        const publicImageUrl = ImageService.getPublicImageUrl(filePath);
        return publicImageUrl;
      } catch (error) {
        if (error instanceof Error) {
          throw new ImageServiceError(
            "Failed to process or upload image",
            error
          );
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof ImageServiceError) {
        throw error;
      }
      throw new ImageServiceError(
        "Unexpected error while creating image",
        error
      );
    }
  }

  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      if (!imageUrl) {
        throw new ImageServiceError("Image URL is required");
      }
      const imagePath = ImageService.extractImagePath(imageUrl);
      
      if (!imagePath) {
        throw new ImageServiceError("Invalid image URL format");
      }

      await supabaseS3.delete(imagePath);
      return true;
    } catch (error) {
      if (error instanceof ImageServiceError) {
        throw error;
      }
      throw new ImageServiceError("Failed to delete image", error);
    }
  }

  private async compressToWebp(file: File): Promise<Buffer> {
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    let quality = 100;
    let outputBuffer: Buffer = await sharp(inputBuffer)
      .webp({ quality })
      .toBuffer();

    while (outputBuffer.length > MAX_SIZE_BYTES && quality > 10) {
      quality -= 5;
      outputBuffer = await sharp(inputBuffer).webp({ quality }).toBuffer();
    }

    if (outputBuffer.length > MAX_SIZE_BYTES) {
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: 1024 })
        .webp({ quality })
        .toBuffer();
    }

    return outputBuffer;
  }
}