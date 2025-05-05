export interface Hotel {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ImageType {
  src: string;
  width: number;
  height: number;
  format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
}

export interface Gallery {
  url: ImageType;
  alt: string;
}
