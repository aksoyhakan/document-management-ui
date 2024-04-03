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
import { Input } from "baseui/input";

export default function CreateFolderModal({
  newFolderName,
  setNewFolderName,
  newFolderModal,
  setNewFolderModal,
  createFolderMutate,
}) {
  function handleFileDrop(event) {
    setFile(event[0]);
  }
  return (
    <Modal
      onClose={() => setNewFolderModal(false)}
      closeable
      isOpen={newFolderModal}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Create new folder</ModalHeader>
      <ModalBody>
        Please enter new folder name
        <div className="w-[100%] mt-4">
          <Input
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => setNewFolderModal(false)}
          kind={ButtonKind.tertiary}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={() => {
            createFolderMutate();
            setNewFolderModal(false);
          }}
        >
          Continue
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
