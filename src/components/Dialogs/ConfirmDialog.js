import React from 'react'
import { Button, Modal,ModalBody, ModalFooter } from 'reactstrap'

function ConfirmDialog({ modalOpen, onToggle, title, body,onConfirm }) {
  return (
    <Modal isOpen={modalOpen} style={{ top: '25%' }} backdrop={true}>
      <div className=" modal-header">
        <h5 className=" modal-title">{title}</h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={() => onToggle(!modalOpen)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <h4>{body}</h4>
      </ModalBody>
      <ModalFooter>
          <Button size='sm' color='success' onClick={()=>onToggle(!modalOpen)}>Cancel</Button>
          <Button size='sm' color='primary' onClick={onConfirm}>Confirm</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmDialog
