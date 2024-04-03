import { useQuery } from "@tanstack/react-query";
import { MainApiService } from "../utils";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import FolderImg from "../assets/folder.svg";
import FileImg from "../assets/document.svg";

function fetchGetFolderDetail(id, signal) {
  return MainApiService.folders.getOneFolder(id, signal);
}
export default function FolderDetail() {
  const { folderId } = useParams();

  const [folderData, setFolderData] = useState({});

  const folderDetailQuery = useQuery({
    queryKey: ["folderDetail", folderId],
    staleTime: 0,
    cacheTime: 0,
    queryFn: async ({ signal }) => {
      const response = fetchGetFolderDetail(folderId, signal);
      return response;
    },
  });

  useEffect(() => {
    if (folderDetailQuery?.data) {
      const newData = {
        id: folderDetailQuery?.data?.id,
        name: folderDetailQuery?.data?.name,
        files: folderDetailQuery?.data?.files?.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(new Blob(file.data.data)),
        })),
      };

      setFolderData(newData);
    }
  }, [folderDetailQuery?.data]);

  return folderDetailQuery?.isLoading ? (
    <div>Loading folder details</div>
  ) : (
    <div className="p-6">
      <h2 className="xl:text-2xl lg:text-xl sm:text-base mb-6 font-bold">
        Folder Detail
      </h2>
      <div className="flex justify-start items-center gap-x-4 mb-8">
        <img src={FolderImg} />
        <p className="text-2xl font-semibold">{`Folder Name: ${folderData?.name}`}</p>
      </div>

      {folderData?.files?.length > 0 ? (
        folderData?.files?.map((file, index) => (
          <div className="flex justify-start items-center gap-x-4 mb-4">
            <img src={FileImg} />
            <a href={file.url} target="blank">{`${index + 1}. file: ${
              file.name
            }`}</a>
          </div>
        ))
      ) : (
        <p>No file added</p>
      )}
    </div>
  );
}
