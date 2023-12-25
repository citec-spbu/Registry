import { authorizedFetch } from "@/shared/utils";

export const fetchDeleteProjectLink = async (
  projectId: number,
  fileId: number,
) => {
  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/api/project/" +
      projectId +
      "/links/" +
      fileId,
    {
      method: "DELETE",
    },
  ).then((response) => {
    if (!response.ok) return 0;

    return 1;
  });

  return result;
};
