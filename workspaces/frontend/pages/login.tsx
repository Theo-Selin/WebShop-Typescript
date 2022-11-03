import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, ReactElement, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import Button from "../components/Button";
import { logIn } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const token = await logIn({ email, password });
    if (token) {
      router.push("/");
    } else {
      setError("Email or password not correct");
    }
  };

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
              Login
            </h1>
            <form onSubmit={handleSubmit} className="py-6 px-12">
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setError("");
                    return setEmail(event.target.value);
                  }}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                />
              </div>
              <div className="mb-20">
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
              {error && <p className="text-red-400">{error}</p>}
              <Button title="Login" width="w-full" />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Login;
