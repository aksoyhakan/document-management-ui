import { useState } from "react";
import { getBreakPoint } from "../constants";
import { useWindowSize } from "react-use";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobal, useToast } from "../hooks";
import { MainApiService } from "../utils";
import FolderRow from "../components/folder/FolderRow";

function fetchGetFolder(signal) {
  return MainApiService.folders.getAllFolders(signal);
}
export default function Folder() {
  const foldersQuery = useQuery({
    queryKey: ["folders"],
    staleTime: 0,
    cacheTime: 0,
    queryFn: ({ signal }) => fetchGetFolder(signal),
  });

  return foldersQuery?.isLoading ? (
    <div>Loading Folders</div>
  ) : (
    <div className="p-6">
      <h2 className="xl:text-2xl lg:text-xl sm:text-base mb-6 font-bold">
        My landing page
      </h2>
      {foldersQuery.data.map((folder) => (
        <FolderRow
          key={folder.id}
          folderId={folder.id}
          folderName={folder.name}
          files={folder?.files ?? []}
          refetch={foldersQuery?.refetch}
        />
      ))}
    </div>
  );
}
