import React, { useRef } from "react";
import useProduct from "../utils/hooks/useProduct";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./Button";

interface Props {
  id: string;
}

const EditProductPage = ({ id }: Props) => {
  const { product, isFetched } = useProduct(id as string);
  const textAreaRef = useRef<null | any>(null);

  return (
    <div>
      <main className="my-24">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
            <form id="productForm" className="py-6 px-9" method="POST">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Category
                  <select
                    name="categories"
                    id="categories"
                    form="productForm"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Product title
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={isFetched ? product?.name : ""}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Manufacturer
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    // value={product?.manufacturer}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5 flex gap-12">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Weight
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    // value={product?.weight}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Price
                  <input
                    type="number"
                    name="price"
                    id="price"
                    // value={product?.price}
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
                    <TextareaAutosize
                      ref={textAreaRef}
                      name="description"
                      id="description"
                      form="productForm"
                      // value={product?.description}
                      className="w-full resize-none overflow-hidden rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                    />
                  </label>
                </div>
              </div>

              <div>
                <Button title="Create" width="w-full" />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProductPage;
