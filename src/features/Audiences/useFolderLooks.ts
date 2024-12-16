import { useContext } from "react";
import { useQuery } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";

const useFolderLooks = (folderId: string) => {
  const { core40SDK } = useContext(ExtensionContext);

  return useQuery({
    queryKey: ["useFolderLooks", folderId],
    queryFn: () => core40SDK.ok(core40SDK.folder_looks(folderId)),
    enabled: !!folderId,
  });
};

export default useFolderLooks;
