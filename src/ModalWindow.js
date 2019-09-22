import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalWindow extends React.Component{
    render(){
        return(
            <Modal show={this.props.ModalOpen}>
                <Modal.Header>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div><h2>{this.props.error}</h2></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.ModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}