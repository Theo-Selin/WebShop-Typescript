export const getCategoryFromPath = (path: string) =>
  path.split("/").slice(-1)[0];
