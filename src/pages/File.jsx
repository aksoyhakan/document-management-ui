import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast, useNewFile } from "../hooks";
import { MainApiService } from "../utils";
import FileRow from "../components/file/FileRow";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { useWindowSize } from "react-use";
import { getBreakPoint } from "../constants";
import CreateFileModal from "../components/file/CreateFileModal";
import SearchImg from "../assets/search.svg";

function fetchGetFile(signal) {
  return MainApiService.files.getAllFiles(signal);
}

function fetchGetSearchFile(name) {
  return MainApiService.files.getSearchFiles(name);
}

function fetchCreateFile(file, folderId) {
  return MainApiService.files.createFile(file, folderId);
}

function fetchGetFolder(signal) {
  return MainApiService.folders.getAllFolders(signal);
}

export default function File() {
  const [createFileModal, setCreateFileModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const { width } = useWindowSize();
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

  const filesQuery = useQuery({
    queryKey: ["files"],
    staleTime: 0,
    cacheTime: 0,
    queryFn: ({ signal }) => fetchGetFile(signal),
  });

  const foldersQuery = useQuery({
    queryKey: ["folders"],
    staleTime: 0,
    cacheTime: 0,
    queryFn: ({ signal }) => fetchGetFolder(signal),
  });

  const { mutate: createFileMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchCreateFile(file, parentFolderId[0].id);

      if (response) {
        filesQuery.refetch();
        setFile(null);
        setParentFolderId(null);
        toast.open({
          content: `New file is created`,
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

  const { mutate: getSearchFileMutate, data: getSearchFileData } = useMutation({
    mutationFn: async () => {
      const response = await fetchGetSearchFile(searchValue);
      if (response) {
        setSearchShow(true);
        toast.open({
          content: `Search is done`,
          kind: "positive",
        });
      }
      return response;
    },
    onError: (err) => {
      toast.open({
        content: err.message,
        kind: "negative",
      });
    },
  });

  function handleSearch(event) {
    if (event.target.value) {
      setSearchValue(event.target.value);
    } else {
      setSearchValue("");
      setSearchShow(false);
    }
  }

  return filesQuery?.isLoading ? (
    <div>Loading files</div>
  ) : (
    <>
      <CreateFileModal
        createFileModal={createFileModal}
        setCreateFileModal={setCreateFileModal}
        file={file}
        setFile={setFile}
        createFileMutate={createFileMutate}
        folders={foldersQuery?.data ?? []}
        parentFolderId={parentFolderId}
        setParentFolderId={setParentFolderId}
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="xl:text-2xl lg:text-xl sm:text-base font-bold">
            My files
          </h2>

          <div className="flex justify-end items-start gap-x-8 w-[80%]">
            <div className="flex justify-start items-center gap-x-2 w-[60%]">
              <Input
                value={searchValue}
                size={width >= getBreakPoint("lg") ? "default" : "compact"}
                onChange={handleSearch}
                startEnhancer={<img src={SearchImg} />}
                placeholder="Type file name"
                clearable
              />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  getSearchFileMutate();
                }}
              >
                Search
              </Button>
            </div>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setCreateFileModal(true);
              }}
            >
              Create new file
            </Button>
          </div>
        </div>
        {searchShow ? (
          <FileRow
            key={getSearchFileData?.id}
            fileId={getSearchFileData?.id}
            folderName={getSearchFileData?.folderName}
            fileName={getSearchFileData?.name}
            blob={getSearchFileData?.data.data}
            refetch={filesQuery.refetch}
          />
        ) : filesQuery?.data?.length > 0 ? (
          filesQuery.data.map((file) => (
            <FileRow
              key={file.id}
              fileId={file.id}
              folderName={file.folderName}
              fileName={file.name}
              blob={file.data.data}
              refetch={filesQuery.refetch}
            />
          ))
        ) : (
          <div className="flex justify-center items-center p-20">
            <p className="xl:text-2xl lg:text-xl sm:text-base font-bold">
              No file to show
            </p>
          </div>
        )}
      </div>
    </>
  );
}
