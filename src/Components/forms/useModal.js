import React, { useState } from 'react'
// import { Button } from "react-bootstrap";

// import { Button, Modal as AntdModal } from 'antd'

const useModal = () => {
    const [on, setOn] = useState(false)
    const toggle = () => setOn(!on)
    const ModalBtn = props => <Button {...props} onClick={toggle} />;
    const Modal = ({ onOK, ...rest }) => (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
    return {
      on,
      toggle,
      ModalBtn,
      Modal
    };
}

export default useModal