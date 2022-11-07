import React, { useEffect, useRef, useState } from "react";
import useProduct from "../utils/hooks/useProduct";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./Button";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useUploads } from "../utils/hooks/useUploads";
import Image from "next/image";
import { toast } from "react-hot-toast";
import useCategories from "../utils/hooks/useCategories";

interface Values {
  name: string;
  description: string;
  weight: number;
  price: number;
  manufacturer: string;
  category: string;
}

interface Props {
  id: string;
}

const EditProductPage = ({ id }: Props) => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const { categories } = useCategories();
  const { product, updateProduct, isFetched } = useProduct(id);
  const { addUpload, removeUpload } = useUploads();
  const textAreaRef = useRef<null | any>(null);

  useEffect(() => {
    if (!isFetched || !product) {
      return;
    }
    setUploads(product.images);
    setImages(product.images.map((upload) => upload._id));
  }, [isFetched]);

  if (!isFetched || !product) {
    return null;
  }

  const handleImagesChange = (event: React.FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    const formData = new FormData();
    Array.from(files || []).forEach((file) => {
      formData.append("files", file);
    });
    addUpload.mutate(formData, {
      onSuccess: (uploads) => {
        const returnedUploads: Upload[] = Array.isArray(uploads)
          ? uploads
          : [uploads];
        setImages((images) => [
          ...images,
          ...returnedUploads.map((upload) => upload._id),
        ]);
        setUploads((previousUploads) => [
          ...previousUploads,
          ...returnedUploads,
        ]);
      },
    });
  };

  const handleDeleteUpload = (id: string) => {
    removeUpload.mutate(id, {
      onSuccess: () => {
        setImages((images) => images.filter((image) => image !== id));
        setUploads((previousUploads) =>
          previousUploads.filter((upload) => upload._id !== id)
        );
      },
    });
  };

  return (
    <Formik
      initialValues={{
        name: product.name,
        description: product.description,
        weight: product.weight,
        price: product.price,
        manufacturer: product.manufacturer,
        category: product.category._id || "",
      }}
      onSubmit={(
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
      ) => {
        const payload = { ...values, images };
        updateProduct.mutate(payload, {
          onSuccess: () => {
            toast.success(`Product, ${values.name}, updated!`, {
              position: "bottom-center",
              className: "text-sm",
            });
            setSubmitting(false);
          },
        });
      }}
    >
      <main className="my-24">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
            <Form className="py-6 px-9">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Category
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  >
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Product title
                  <Field
                    name="name"
                    id="name"
                    placeholder="name of the product"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Manufacturer
                  <Field
                    name="manufacturer"
                    id="manufacturer"
                    placeholder="who's the manufacturer"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5 flex gap-12">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Weight
                  <Field
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder="KG"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Price
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    placeholder="USD"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload Pictures
                </label>

                <div className="mb-8">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="multiple_files"
                  >
                    Upload multiple files
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                    id="multiple_files"
                    type="file"
                    onChange={handleImagesChange}
                    value=""
                    multiple
                  />
                </div>
                <div>
                  {uploads.map((upload) => (
                    <div
                      key={upload._id}
                      className="mb-8 flex w-64 justify-between text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${upload.path}`}
                        alt="uploaded product image"
                        width="100"
                        height="100"
                        objectFit="contain"
                      />

                      <p className="flex items-center">{upload.originalname}</p>

                      <button
                        type="button"
                        onClick={() => handleDeleteUpload(upload._id)}
                        className="my-auto h-6 w-6 text-lg text-gray-900 opacity-50 hover:opacity-100 dark:text-gray-300"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Description
                    <Field
                      as={TextareaAutosize}
                      ref={textAreaRef}
                      name="description"
                      id="description"
                      placeholder="now sell it with all your might!"
                      className="w-full resize-none overflow-hidden rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                    />
                  </label>
                </div>
              </div>

              <div>
                <Button title="Update" width="w-full" type="submit" />
              </div>
            </Form>
          </div>
        </div>
      </main>
    </Formik>
  );
};

export default EditProductPage;
