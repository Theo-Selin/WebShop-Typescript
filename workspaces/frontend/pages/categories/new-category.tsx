import Head from "next/head";
import React, { ReactElement } from "react";
import Button from "../../components/Button";
import { Formik, FormikHelpers, Form, Field } from "formik";
import useCategories from "../../utils/hooks/useCategories";
import BaseLayout from "../../components/BaseLayout";
import { toast } from "react-hot-toast";

interface Values {
  name: string;
}

const NewCategory = () => {
  const { createCategory } = useCategories();
  return (
    <>
      <Head>
        <title>Admin - Add Product</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          createCategory.mutate(
            { name: values.name },
            {
              onSuccess: () => {
                toast.success(`New Category, ${values.name}, added!`, {
                  position: "top-center",
                  className: "text-sm",
                });
                resetForm();
                setSubmitting(false);
              },
            }
          );
        }}
      >
        <main className="my-24">
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
              <Form id="productForm" className="py-6 px-9" method="POST">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Category name
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name of new category"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                    />
                  </label>
                </div>
                <div>
                  <Button title="Create" width="w-full" type="submit" />
                </div>
              </Form>
            </div>
          </div>
        </main>
      </Formik>
    </>
  );
};

NewCategory.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default NewCategory;
