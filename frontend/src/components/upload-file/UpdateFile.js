import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { BASE_URL } from '../../utils/config'
import Swal from 'sweetalert2'

const UpdateFile = (props) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [subject, setSubject] = useState('');
    const [semester, setSemester] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Do something with the form data, like sending it to a server
        console.log(title,desc,subject,semester)

        try {
            console.log(`entro a modificar: id del documento: ${props.document._id}`)
            const documentToUpdate = {
                "title": title,
                "desc": desc,
                "subject": subject,
                "semester": semester
            }


      
            fetch(`${BASE_URL}/documents/${props.document._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(documentToUpdate)
            })
              .then(response => response.json())
              .then(data => {
                Swal.fire({
      
                  icon: 'success',
                  title: 'Your document has been saved',
                  showConfirmButton: false,
                  timer: 2000
                })
              })
              .catch(error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
      
                })
              })
        } catch (error) {
            
        }

      
      
          
        // Close the modal after submitting the form
        props.onClose();
      };
  return (
    <Modal isOpen={true} toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>Update document</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="desc">Description</Label>
        <Input type="text" id="desc" value={desc} onChange={(event) => setDesc(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="subject">Subject</Label>
        <Input type="text" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="semester">semester</Label>
        <Input type="text" id="semester" value={semester} onChange={(event) => setSemester(event.target.value)} />
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={handleSubmit}>Update</Button>
      <Button color="secondary" onClick={props.onClose}>Cancel</Button>
    </ModalFooter>
  </Modal>
  )
}

export default UpdateFile