import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

interface ProductProps {
  product: Product;
}

const ImageGalleryComponent = ({ product }: ProductProps) => {
  const images = product.images.map((image) => ({
    original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.path}`,
    thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.path}`,
    originalHeight: 200,
    originalWidth: 200,
    sizes: "200px",
  }));

  return images.length ? (
    <ImageGallery
      items={images}
      showPlayButton={false}
      showNav={false}
      showFullscreenButton={false}
      lazyLoad={true}
    />
  ) : null;
};

export default ImageGalleryComponent;
