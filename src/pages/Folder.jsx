import { useState } from "react";
import { getBreakPoint } from "../constants";
import { useWindowSize } from "react-use";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../hooks";
import { MainApiService } from "../utils";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import FolderRow from "../components/folder/FolderRow";
import CreateFolderModal from "../components/folder/CreateFolderModal";
import SearchImg from "../assets/search.svg";

function fetchGetFolder(signal) {
  return MainApiService.folders.getAllFolders(signal);
}

function fetchGetSearchFolder(name) {
  return MainApiService.folders.getSearchFolders(name);
}

function fetchCreateFolder(name) {
  return MainApiService.folders.createFolder(name);
}
export default function Folder() {
  const toast = useToast();
  const { width } = useWindowSize();
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const foldersQuery = useQuery({
    queryKey: ["folders"],
    staleTime: 0,
    cacheTime: 0,
    queryFn: ({ signal }) => fetchGetFolder(signal),
  });

  const { mutate: getSearchFoldersMutate, data: getSearchFoldersData } =
    useMutation({
      mutationFn: async () => {
        const response = await fetchGetSearchFolder(searchValue);
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

  const { mutate: createFolderMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchCreateFolder(newFolderName);
      if (response) {
        foldersQuery.refetch();
        setNewFolderName("");
        toast.open({
          content: `New folder is created successfully`,
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

  function handleSearch(event) {
    if (event.target.value) {
      setSearchValue(event.target.value);
    } else {
      setSearchValue("");
      setSearchShow(false);
    }
  }

  return foldersQuery?.isLoading ? (
    <div>Loading Folders</div>
  ) : (
    <>
      <CreateFolderModal
        newFolderModal={newFolderModal}
        setNewFolderName={setNewFolderName}
        newFolderName={newFolderName}
        setNewFolderModal={setNewFolderModal}
        createFolderMutate={createFolderMutate}
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="xl:text-2xl lg:text-xl sm:text-base font-bold">
            My folders
          </h2>
          <div className="flex justify-end items-start gap-x-8 w-[80%]">
            <div className="flex justify-start items-center gap-x-2 w-[60%]">
              <Input
                value={searchValue}
                size={width >= getBreakPoint("lg") ? "default" : "compact"}
                onChange={handleSearch}
                startEnhancer={<img src={SearchImg} />}
                placeholder="Type folder name"
                clearable
              />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  getSearchFoldersMutate();
                }}
              >
                Search
              </Button>
            </div>
            <Button
              onClick={(event) => {
                event.preventDefault();
                setNewFolderModal(true);
              }}
            >
              Create new folder
            </Button>
          </div>
        </div>

        {searchShow ? (
          <FolderRow
            key={getSearchFoldersData.id}
            folderId={getSearchFoldersData.id}
            folderName={getSearchFoldersData.name}
            files={getSearchFoldersData?.files ?? []}
            refetch={foldersQuery?.refetch}
          />
        ) : foldersQuery?.data?.length > 0 ? (
          foldersQuery.data.map((folder) => (
            <FolderRow
              key={folder.id}
              folderId={folder.id}
              folderName={folder.name}
              files={folder?.files ?? []}
              refetch={foldersQuery?.refetch}
            />
          ))
        ) : (
          <div className="flex justify-center items-center p-20">
            <p className="xl:text-2xl lg:text-xl sm:text-base font-bold">
              No folder to show
            </p>
          </div>
        )}
      </div>
    </>
  );
}
