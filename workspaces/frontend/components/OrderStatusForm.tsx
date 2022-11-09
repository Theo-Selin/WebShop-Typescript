import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { prettyPrintStatus, Status } from "../utils/helpers";
import useAdminOrder from "../utils/hooks/useAdminOrder";
import Button from "./Button";

interface Values {
  status: string;
}

type Props = {
  id: string;
  status: Status;
};

const OrderStatusForm = ({ id, status }: Props) => {
  const { updateAdminOrder } = useAdminOrder(id);

  return (
    <Formik
      initialValues={{ status }}
      onSubmit={(values: Values, { setSubmitting }) => {
        updateAdminOrder.mutate(values.status, {
          onSuccess: () => {
            toast.success("Status updated", {
              position: "top-center",
              className: "text-sm",
            });
          },
        });
      }}
    >
      <Form>
        <div className="flex">
          <Field
            as="select"
            name="status"
            id="status"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
          >
            <option value="registered">
              {prettyPrintStatus("registered")}
            </option>
            <option value="inProgress">
              {prettyPrintStatus("inProgress")}
            </option>
            <option value="inDelivery">
              {prettyPrintStatus("inDelivery")}
            </option>
            <option value="delivered">{prettyPrintStatus("delivered")}</option>
          </Field>
          <Button title="update" type="submit" />
        </div>
      </Form>
    </Formik>
  );
};

export default OrderStatusForm;
