import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

interface ProductProps {
  product: Product;
}

const ImageGalleryComponent = ({ product }: ProductProps) => {
  const images = [
    {
      original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].path}`,
      thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].path}`,
    },
    {
      original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[1].path}`,
      thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[1].path}`,
    },
    {
      original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[2].path}`,
      thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[2].path}`,
    },
  ];
  return images ? <ImageGallery items={images} /> : null;
};

export default ImageGalleryComponent;
