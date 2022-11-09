import React from "react";
import { Form, Field } from "formik";

const AddressForm = () => {
  return (
    <>
      <main className="my-24">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-6 px-9">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Street:
                  <Field
                    name="streetAddress"
                    id="streetAddress"
                    placeholder="where do you live"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  City:
                  <Field
                    name="city"
                    id="city"
                    placeholder="where the street lives"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>

              <div className="mb-5 flex gap-12">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Zip code:
                  <Field
                    name="zipCode"
                    id="zipCode"
                    placeholder="Postal code"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Country
                  <Field
                    name="country"
                    id="country"
                    placeholder="SWE"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddressForm;
