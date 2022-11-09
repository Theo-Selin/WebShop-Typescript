const statusList = {
  active: "Active",
  registered: "Registered",
  inProgress: "In progress",
  inDelivery: "In delivery",
  delivered: "Delivered",
};

export type Status =
  | "active"
  | "registered"
  | "inProgress"
  | "inDelivery"
  | "delivered";

export const prettyPrintStatus = (status: Status) => statusList[status];
