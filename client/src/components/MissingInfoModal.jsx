import React from 'react';
import { Button, Form, Modal, ModalForm, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/MissingInfoModal.css';

const MissingInfoModal = props => {
  return (
    <div>
      {/* Show this modal warning if missing fields were not filled in */}
      <Form>
      <Modal isOpen={props.missing_info}>
             <ModalBody>
              Please Fill Out All Sections
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={props.toggleMissing}> OK </Button>
            </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}


export default MissingInfoModal;
