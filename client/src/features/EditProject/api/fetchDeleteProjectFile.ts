import { authorizedFetch } from "@/shared/utils";

export const fetchDeleteProjectFile = async (
  projectId: number,
  fileId: number,
) => {
  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL +
      "/api/project/" +
      projectId +
      "/result-files/" +
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