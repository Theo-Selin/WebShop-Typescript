import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import BaseLayout from "../../components/BaseLayout";
import Button from "../../components/Button";
import useUsers from "../../utils/hooks/useUsers";
import { toast } from "react-hot-toast";

interface Values {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { createUser } = useUsers();

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Sign up - Create an Account</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          createUser.mutate(values, {
            onSuccess: () => {
              toast.success(`New account created!`, {
                position: "top-center",
                className: "text-sm",
              });
              setSubmitting(false);
              router.push("/users/login");
            },
          });
        }}
      >
        {({ values }) => (
          <main className="my-24">
            <div className="flex items-center justify-center p-14">
              <div className="mx-auto w-full max-w-[550px] bg-white p-14 shadow-lg ring-1 ring-black ring-opacity-5">
                <h1 className="mb-3 block w-full text-center text-2xl font-medium text-[#07074D]">
                  Create account
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
                      Password:
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                  </div>
                  <div className="mb-10">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Confirm password:
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                      />
                    </label>
                    {values.password !== values.confirmPassword && (
                      <p className="w-full text-red-600">
                        Passwords don&apos;t match
                      </p>
                    )}
                  </div>
                  <Button
                    title="Create"
                    width="w-full mb-5"
                    type="submit"
                    disabled={values.password !== values.confirmPassword}
                  />
                  <div className="flex flex-col items-center">
                    <p className="">Already have an account?</p>
                    <Link href="/users/login">
                      <p className="cursor-pointer text-blue-400 hover:text-blue-600">
                        Login here
                      </p>
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </main>
        )}
      </Formik>
    </div>
  );
};

Signup.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Signup;
