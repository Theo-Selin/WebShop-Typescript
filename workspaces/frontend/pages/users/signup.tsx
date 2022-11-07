import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, ReactElement, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import Button from "../../components/Button";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {};

  return (
    <div>
      <Head>
        <title>Admin - Add Product</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <main className="my-24">
        <div className="flex items-center justify-center p-14">
          <div className="mx-auto w-full max-w-[550px] bg-white p-14 shadow-lg ring-1 ring-black ring-opacity-5">
            <h1 className="mb-3 block w-full text-center text-2xl font-medium text-[#07074D]">
              Create account
            </h1>
            <form onSubmit={handleSubmit} className="py-6 px-12">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Full name:{" "}
                </label>
                <input
                  type="text"
                  name="text"
                  placeholder="First and last name"
                  onChange={(event) => {
                    setError("");
                    return setFullName(event.target.value);
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  onChange={(event) => {
                    setError("");
                    return setEmail(event.target.value);
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setError("");
                    return setPassword(event.target.value);
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                />
              </div>
              <div className="mb-10">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Confirm password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setError("");
                    return setPassword(event.target.value);
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                />
              </div>
              {error && <p className="text-red-400">{error}</p>}
              <Button title="Create" width="w-full mb-5" />
              <div className="flex flex-col items-center">
                <p className="">Already have an account?</p>
                <Link href="/login">
                  <p className="cursor-pointer text-blue-400 hover:text-blue-600">
                    Login here
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

Signup.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Signup;
