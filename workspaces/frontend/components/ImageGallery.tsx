import React from "react";

interface ProductProps {
  product: Product;
}

const ImageGallery = ({ product }: ProductProps) => {
  return (
    <div>
      {product.images.length ? (
        <section className="overflow-hidden text-gray-700">
          <div className="mx-auto flex max-w-lg flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="mx-auto block h-full rounded-lg object-contain object-center"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].path}`}
              />
            </div>

            {product.images.length > 1 && (
              <div className="w-1/4 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-contain object-center"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[1].path}`}
                />
              </div>
            )}

            {product.images.length > 2 && (
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[2].path}`}
                />
              </div>
            )}

            {product.images.length > 3 && (
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[3].path}`}
                />
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ImageGallery;
