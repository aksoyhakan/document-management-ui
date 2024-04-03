import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { Select } from "baseui/select";
import { useWindowSize } from "react-use";

export default function CreateFileModal({
  createFileModal,
  setCreateFileModal,
  file,
  setFile,
  createFileMutate,
  folders,
  parentFolderId,
  setParentFolderId,
}) {
  const { width } = useWindowSize();

  const folderList = folders?.map((folder) => ({
    id: folder.id,
    label: folder.name,
  }));

  function handleFileDrop(event) {
    setFile(event[0]);
  }
  return (
    <Modal
      onClose={() => setCreateFileModal(false)}
      closeable
      isOpen={createFileModal}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Create new file</ModalHeader>
      <ModalBody>
        <div className="w-[100%] mt-4">
          <label className="my-6">
            <span>Please, select folder</span>
            <Select
              value={parentFolderId}
              options={folderList}
              labelKey="label"
              valueKey="id"
              searchable={true}
              clearable={false}
              backspaceRemoves={false}
              placeholder="Select folder"
              onChange={({ value }) => setParentFolderId(value)}
              overrides={{
                Popover: {
                  props: {
                    overrides: {
                      Body: {
                        style: () => ({
                          display: "block",
                          zIndex: 10,
                        }),
                      },
                    },
                  },
                },
              }}
            />
          </label>
          <label className="block my-4">
            <span>Please, add your file</span>
            <FileUploader onDrop={handleFileDrop} />
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => setCreateFileModal(false)}
          kind={ButtonKind.tertiary}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={() => {
            createFileMutate();
            setCreateFileModal(false);
          }}
        >
          Continue
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
