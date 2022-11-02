import { useRouter } from "next/router";
import { ReactElement } from "react";
import BaseLayout from "../components/BaseLayout";
import CategoryLayout from "../components/CategoryLayout";
import useCart from "../utils/hooks/useCart";
import useUser from "../utils/hooks/useUser";

const Home = () => {
  const router = useRouter();
  const { user, isError } = useUser();
  const { cart } = useCart();

  console.log(cart);

  if (isError) {
    router.push("/login");
  }

  return <div className="text-white">{JSON.stringify(user, null, 2)}</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </BaseLayout>
  );
};

export default Home;
