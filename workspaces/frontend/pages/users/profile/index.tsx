import { ReactElement } from "react";
import BaseLayout from "../../../components/BaseLayout";
import UpdateUserProfile from "../../../components/UpdateUserProfile";
import UserOrders from "../../../components/UserOrders";
import useUser from "../../../utils/hooks/useUser";

const UpdateUserProfilePage = () => {
  const { user, updateUser } = useUser();

  if (!user) {
    return null;
  }

  return <UpdateUserProfile user={user} updateUser={updateUser} />;
};

UpdateUserProfilePage.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
);

export default UpdateUserProfilePage;
