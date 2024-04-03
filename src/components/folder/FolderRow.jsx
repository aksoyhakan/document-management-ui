import FolderImg from "../../assets/folder.svg";
import FileImg from "../../assets/document.svg";
import { useNavigate } from "react-router-dom";
import { StatefulTooltip } from "baseui/tooltip";
import { useMutation } from "@tanstack/react-query";
import Detail from "../../assets/detail.svg";
import Cross from "../../assets/cross.svg";
import Edit from "../../assets/edit.svg";
import { MainApiService } from "../../utils";
import { useToast, useNewFile } from "../../hooks";
import { useEffect, useState } from "react";
import AddFileModal from "./AddFileModal";

function fetchDeleteFolder(folderId) {
  return MainApiService.folders.deleteFolder(folderId);
}
function fetchAddFile(file, folderId) {
  return MainApiService.files.createFile(file, folderId);
}

export default function FolderRow({ folderName, files, folderId, refetch }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { file, parentFolderId, setFile, setParentFolderId } = useNewFile(
    (state) => ({
      file: state.file,
      parentFolderId: state.parentFolderId,
      setFile: state.setFile,
      setParentFolderId: state.setParentFolderId,
      reset: state.reset,
    })
  );

  useEffect(() => {
    setParentFolderId(folderId);
  }, []);

  const [addFileModal, setAddFileModal] = useState(false);

  const { mutate: deleteFolderMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchDeleteFolder(folderId);
      if (response) {
        refetch();
        toast.open({
          content: `Folder is deleted from db`,
          kind: "positive",
        });
      }
    },
    onError: (err) => {
      toast.open({
        content: err.message,
        kind: "negative",
      });
    },
  });

  const { mutate: addFileMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchAddFile(file, folderId);
      if (response) {
        refetch();
        toast.open({
          content: `New file is added to folder`,
          kind: "positive",
        });
      }
    },
    onError: (err) => {
      toast.open({
        content: err.message,
        kind: "negative",
      });
    },
  });

  return (
    <>
      <AddFileModal
        addFileModal={addFileModal}
        setAddFileModal={setAddFileModal}
        file={file}
        setFile={setFile}
        addFileMutate={addFileMutate}
      />
      <div
        onClick={() => navigate(`/folders/${folderId}`)}
        className={`flex justify-between items-center p-4 hover:bg-blue-100 cursor-pointer transition-colors border-t-2 border-t-solid border-t-gray-100`}
      >
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-start items-center gap-x-4 pb-4">
            <img src={FolderImg} />
            <p className="xl:text-2xl lg:text-xl sm:text-base">{folderName}</p>
          </div>
          <div>
            {files.length > 0 ? (
              files.map((file) => (
                <div className="flex justify-start items-center gap-x-4 pb-2">
                  <img src={FileImg} />
                  <p>{file.name}</p>{" "}
                </div>
              ))
            ) : (
              <p>No file added</p>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center gap-x-8">
          <StatefulTooltip
            accessibilityType={"tooltip"}
            content={"Go to detail"}
            showArrow
          >
            <img
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/folders/${folderId}`);
              }}
              src={Detail}
            />
          </StatefulTooltip>
          <StatefulTooltip
            accessibilityType={"tooltip"}
            content={"Add new file"}
            showArrow
          >
            <img
              onClick={(event) => {
                event.stopPropagation();
                setAddFileModal(true);
              }}
              src={Edit}
            />
          </StatefulTooltip>
          <StatefulTooltip
            accessibilityType={"tooltip"}
            content={"Delete the folder"}
            showArrow
          >
            <img
              onClick={(event) => {
                event.stopPropagation();
                deleteFolderMutate();
              }}
              src={Cross}
            />
          </StatefulTooltip>
        </div>
      </div>
    </>
  );
}
