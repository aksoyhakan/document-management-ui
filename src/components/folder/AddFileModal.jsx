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
import { useWindowSize } from "react-use";

export default function AddFileModal({
  addFileModal,
  setAddFileModal,
  file,
  setFile,
  addFileMutate,
}) {
  const { width } = useWindowSize();

  function handleFileDrop(event) {
    setFile(event[0]);
  }
  return (
    <Modal
      onClose={() => setAddFileModal(false)}
      closeable
      isOpen={addFileModal}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Add new file</ModalHeader>
      <ModalBody>
        Please add new file to selected folder
        <div className="w-[100%] mt-4">
          <FileUploader onDrop={handleFileDrop} />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => setAddFileModal(false)}
          kind={ButtonKind.tertiary}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={() => {
            addFileMutate();
            setAddFileModal(false);
          }}
        >
          Continue
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
