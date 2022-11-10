import Head from "next/head";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Button from "../components/Button";
import { UseMutationResult } from "@tanstack/react-query";
import { UpdateUserParams } from "../utils/api";
import { toast } from "react-hot-toast";

interface Values {
  fullName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
}

type Props = {
  user: User;
  updateUser: UseMutationResult<User, unknown, UpdateUserParams, unknown>;
};

const UpdateUserProfile = ({ user, updateUser }: Props) => {
  return (
    <div>
      <Head>
        <title>Update profile details</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Formik
        initialValues={{
          fullName: user.fullName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          streetAddress: user.deliveryAddress?.streetAddress || "",
          zipCode: user.deliveryAddress?.zipCode || "",
          city: user.deliveryAddress?.city || "",
          country: user.deliveryAddress?.country || "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          const { streetAddress, zipCode, city, country, ...rest } = values;
          const deliveryAddress = { streetAddress, zipCode, city, country };
          updateUser.mutate(
            { deliveryAddress, ...rest },
            {
              onSuccess: () => {
                toast.success(`Profile updated!`, {
                  position: "top-center",
                  className: "text-sm",
                });
                setSubmitting(false);
              },
              onError: () => {
                toast.error(`There was a problem updating the profile!`, {
                  position: "top-center",
                  className: "text-sm",
                });
              },
            }
          );
        }}
      >
        {({ values }) => (
          <main className="my-24">
            <div className="flex items-center justify-center p-14">
              <div className="mx-auto w-full max-w-[550px] bg-white p-14 shadow-lg ring-1 ring-black ring-opacity-5">
                <h1 className="mb-3 block w-full text-center text-2xl font-medium text-[#07074D]">
                  Update profile
                </h1>
                <Form className="py-6 px-12">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Full name:
                      <Field
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="First and last name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Email:
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Phone number:
                      <Field
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <h2 className="mb-3 block w-full text-center text-xl font-medium text-[#07074D]">
                    Address
                  </h2>
                  <div className="mb-10">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Street:
                      <Field
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-10">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Zip code:
                      <Field
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-10">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      City:
                      <Field
                        type="text"
                        name="city"
                        id="city"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-10">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Country:
                      <Field
                        type="text"
                        name="country"
                        id="country"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <Button title="Save" width="w-full mb-5" type="submit" />
                </Form>
              </div>
            </div>
          </main>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserProfile;
