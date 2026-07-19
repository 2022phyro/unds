"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface CloudinaryImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string;
  width?: number; // Target width for Cloudinary optimization
  height?: number; // Optional numeric height if using explicit sizing
  aspectRatio?: string; 
  priority?: boolean; 
}

export function CloudinaryImage({
  src,
  alt = "Image",
  width = 800, // Used for Cloudinary URL API optimization
  height,
  className = "",
  aspectRatio,
  priority = false,
  ...props
}: CloudinaryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedSrc = React.useMemo(() => {
    if (!src || !src.includes("cloudinary.com")) return src;
    if (src.includes("f_auto,q_auto")) return src;

    return src.replace(
      /\/upload\/(v\d+\/)?/,
      `/upload/f_auto,q_auto,w_${width},c_limit/$1`
    );
  }, [src, width]);

  // FIX: Force layout fill if no explicit height is provided to match "w-full h-full"
  const isUsingFill = !height;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-stone-900/10 ${
        aspectRatio ? `aspect-${aspectRatio}` : ""
      }`}
    >
      <Image
        src={optimizedSrc}
        alt={alt}
        // If filling, pass undefined so Next.js uses container CSS layout
        width={!isUsingFill ? width : undefined}
        height={!isUsingFill ? height : undefined}
        fill={isUsingFill}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
