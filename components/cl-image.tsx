"use client";

import React, { useState } from "react";

interface CloudinaryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number; // Target width for optimization
  aspectRatio?: string; // Optional custom aspect ratio styling (e.g., "video", "square")
}

export function CloudinaryImage({
  src,
  alt = "Image",
  width = 800,
  className = "",
  aspectRatio,
  ...props
}: CloudinaryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Robust helper to transform any Cloudinary URL dynamically
  const optimizedSrc = React.useMemo(() => {
    if (!src || !src.includes("cloudinary.com")) return src;
    
    // Safety check: Avoid double transformations if already modified
    if (src.includes("f_auto,q_auto")) return src;

    // Inject optimization parameters (f_auto, q_auto, width constraint, and limiting constraint)
    return src.replace(
      /\/upload\/(v\d+\/)?/,
      `/upload/f_auto,q_auto,w_${width},c_limit/$1`
    );
  }, [src, width]);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-stone-900/10 ${
        aspectRatio ? `aspect-${aspectRatio}` : ""
      }`}
    >
      <img
        src={optimizedSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className}`}
        {...props}
      />
    </div>
  );
}