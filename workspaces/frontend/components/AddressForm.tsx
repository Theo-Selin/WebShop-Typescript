import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Head from "next/head";
import Button from "./Button";

interface Values {
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
}

const AddressForm = () => {
  return (
    <>
      <Head>
        <title>Admin - New Product</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Formik
        initialValues={{
          streetAddress: "",
          zipCode: "",
          city: "",
          country: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          const payload = { ...values };
          // createAddress.mutate(payload, {
          //   onSuccess: () => {
          //     toast.success(`Address, ${values.streetAddress}, added!`, {
          //       position: "top-center",
          //       className: "text-sm",
          //     });
          //     setSubmitting(false);
          //     resetForm();
          //   },
          // });
        }}
      >
        <main className="my-24">
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
              <Form className="py-6 px-9">
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

                <div>
                  <Button title="Save" width="w-full" type="submit" />
                </div>
              </Form>
            </div>
          </div>
        </main>
      </Formik>
    </>
  );
};

export default AddressForm;
