import { FormEventHandler, ReactElement, useState } from "react";
import BaseLayout from "../components/BaseLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
          onChange={(event) => setEmail(event.target.value)}
          className="block rounded border border-gray-900 bg-gray-50 px-2.5 py-1 text-sm text-gray-900"
        />
        <label className="block">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="block rounded border border-gray-900 bg-gray-50 px-2.5 py-1 text-sm text-gray-900"
        />
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
