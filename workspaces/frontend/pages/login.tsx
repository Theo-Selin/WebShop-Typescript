import { useRouter } from "next/router";
import { FormEventHandler, ReactElement, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { logIn } from "../utils/fetchUserInfo";

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
    <form
      onSubmit={handleSubmit}
      className="flex h-screen flex-col items-center justify-center "
    >
      <div>
        <label className="block">Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setError("");
            return setEmail(event.target.value);
          }}
          className="block rounded border border-gray-900 bg-gray-50 px-2.5 py-1 text-sm text-gray-900"
        />
        <label className="block">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setError("");
            return setPassword(event.target.value);
          }}
          className="block rounded border border-gray-900 bg-gray-50 px-2.5 py-1 text-sm text-gray-900"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="rounded bg-gradient-to-r from-pink-500 to-violet-500 px-2.5 py-1 text-white"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

Login.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Login;
