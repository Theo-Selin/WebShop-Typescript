import React, { ReactElement, useRef, useState } from "react";
import useProduct from "../utils/hooks/useProduct";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./Button";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useUploads } from "../utils/hooks/useUploads";

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
  const { product, isFetched } = useProduct(id);
  const textAreaRef = useRef<null | any>(null);

  if (!isFetched || !product) {
    return null;
  }

  console.log(product);

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
        alert(JSON.stringify(payload, null, 2));
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
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
                  <label className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="sr-only"
                    />
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Drop files here
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Or
                      </span>
                      <span className="inline-flex cursor-pointer rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Browse
                      </span>
                    </div>
                  </label>
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
                <Button title="Create" width="w-full" type="submit" />
              </div>
            </Form>
          </div>
        </div>
      </main>
    </Formik>
  );
};

export default EditProductPage;
