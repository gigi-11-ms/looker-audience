import { useContext } from "react";
import { useQuery } from "react-query";
import { ExtensionContext } from "@looker/extension-sdk-react";

const useFolder = (folderId: string) => {
  const { core40SDK } = useContext(ExtensionContext);

  return useQuery({
    queryKey: ["useFolder", folderId],
    queryFn: () => core40SDK.ok(core40SDK.folder(folderId)),
    enabled: !!folderId,
    staleTime: 0,
    cacheTime: 0,
  });
};

export default useFolder;
