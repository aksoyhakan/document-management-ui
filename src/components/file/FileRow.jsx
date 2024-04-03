import FileImg from "../../assets/document.svg";
import Cross from "../../assets/cross.svg";
import { MainApiService } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { StatefulTooltip } from "baseui/tooltip";
import { useToast } from "../../hooks";

function fetchDeleteFile(fileId) {
  return MainApiService.files.deleteFile(fileId);
}

export default function FileRow({
  folderName,
  blob,
  fileName,
  fileId,
  refetch,
}) {
  const toast = useToast();

  const { mutate: deleteFileMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchDeleteFile(fileId);
      if (response) {
        refetch();
        toast.open({
          content: `File is deleted from db`,
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
    <div className="flex justify-between items-center p-6 hover:bg-blue-100 transition-colors border-t-2 border-t-solid border-t-gray-100">
      <div className={`flex flex-col justify-start items-start`}>
        <div className="flex justify-start items-center gap-x-4 pb-4">
          <img src={FileImg} />
          <p className="xl:text-2xl lg:text-xl sm:text-base">{fileName}</p>
        </div>

        <p>{`Folder Name: ${folderName}`}</p>
      </div>
      <div>
        <StatefulTooltip
          accessibilityType={"tooltip"}
          content={"Delete the file"}
          showArrow
        >
          <img
            onClick={(event) => {
              event.stopPropagation();
              deleteFileMutate();
            }}
            src={Cross}
          />
        </StatefulTooltip>
      </div>
    </div>
  );
}
