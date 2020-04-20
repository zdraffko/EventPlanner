import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalComponent = () => {
  const { CommonStore } = useContext(RootStoreContext);

  const { modal, closeModal } = CommonStore;

  return (
    <Modal open={modal.isOpen} onClose={closeModal} size="mini" style={{ paddingBottom: "50px" }}>
      <Modal.Content>{modal.content}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalComponent);
