import React from 'react'
import { Modal, ModalBody, Row, Card, CardBody } from 'reactstrap'
import InputForm from '../inputForm'

function EditDialog({ data, modalOpen, onToggle }) {
  return (
    <Modal
      isOpen={modalOpen}
      size="lg"
      backdrop={true}
      style={{ top: '5%', maxWidth: '50%' }}
    >
      <div className="pt-3 pb-3 pr-2" style={{ background: '#e9e9ef' }}>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={() => onToggle(!modalOpen)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>

      <ModalBody className="waybill-detail-dialog">
        <Row className="d-flex justify-content-center">
          <Card style={{ width: '100%' }}>
            <CardBody>
              <InputForm title = "Order Edit" data={data} />
            </CardBody>
          </Card>
        </Row>
      </ModalBody>
    </Modal>
  )
}
export default EditDialog
