import React, { useState, useContext, useEffect } from 'react'
import { upload_File } from '../../firebase/config'
import { Button, Form, FormGroup } from 'reactstrap'
import "./upload.css"
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import Swal from 'sweetalert2'

const UploadFile = ({ document: initialDocument }) => {
  const { user, dispatch } = useContext(AuthContext)

  const [file, setFile] = useState(null)
  const [document, setDocument] = useState({
    title: "",
    subject: "",
    semester: "",
    username: "",
    useremail: "",
    desc: ""
  })

  useEffect(() => {
    if (user) {
      setDocument((prev) => ({
        ...prev,
        username: user.username,
        useremail: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (initialDocument) {
      setDocument(initialDocument);
    }
  }, [initialDocument]);

  const handleChange = e => {
    setDocument(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = e.target.innerText;


    try {
      const result = await upload_File(file)

      if (result) {
        document['documentUrl'] = result
        user ? (console.log(`usuario: ${user.username} email: ${user.email}`)) : console.log('no ha iniciado sesion')
        console.log(`valor del rsultado: ${result}`)
        const documentJson = JSON.stringify(document)
        console.log(`document: ${documentJson}`)
        const res = await fetch(`${BASE_URL}/documents/`, { method: 'post', headers: { 'content-type': 'application/json' }, body: documentJson })
        const response = await res.json()
        console.log(response.message)
        console.log(`estado respuesta: ${response.success}`)

        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 2500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }


      }

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }


  }


  return (
    <div className='upload'>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <input type='text' placeholder='title' id='title' required onChange={handleChange} value={document.title}></input>
        </FormGroup>
        <FormGroup>
          <input type='text' placeholder='Text description' id='desc' required onChange={handleChange} value={document.desc}></input>
        </FormGroup>
        <FormGroup>
          <input type='text' placeholder='subject' id='subject' required onChange={handleChange} value={document.subject}></input>
        </FormGroup>
        <FormGroup className='d-felx align-items-center gap-3'>

          <input type='text' placeholder='semester' id='semester' required onChange={handleChange} value={document.semester}></input>
          <input type='file' name="" id="archivo" accept="application/pdf" required onChange={e => setFile(e.target.files[0])} />
          <Button className='btn primary__btn w-100 w-100 mt-4' >Upload</Button>

        </FormGroup>




      </Form>

    </div>
  )
}

export default UploadFile