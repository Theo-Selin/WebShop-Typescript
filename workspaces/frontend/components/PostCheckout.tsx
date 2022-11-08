import Link from "next/link";

const PostCheckout = () => {
  return (
    <main className="my-24">
      <div className="flex items-center justify-center p-14">
        <div className="mx-auto w-full max-w-[550px] bg-white p-14 shadow-lg ring-1 ring-black ring-opacity-5">
          <h1 className="mb-3 block w-full text-center text-2xl font-medium text-[#07074D]">
            Thank you!
          </h1>
          <p className="mt-2 text-[12px]">
            Your order has been registered and will be processed by our staff as
            soon as possible. To see the status of your order, visit the{" "}
            <Link href="/orders">
              <a className="text-green-400">orders page</a>
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default PostCheckout;
