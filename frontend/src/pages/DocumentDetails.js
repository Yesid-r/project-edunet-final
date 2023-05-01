
import { useParams, useNavigate } from "react-router-dom"
import React, { useRef, useContext, useState } from 'react'
import useFetch from "../hooks/useFetch"
import { BASE_URL } from "../utils/config"
import { Button, ButtonGroup, Col, Container, Form, ListGroup, Row } from "reactstrap"
import "../styles/document-details.css"
import UploadFile from "../components/upload-file/UploadFile"
import { AuthContext } from "../context/AuthContext"
import Swal from "sweetalert2"
import UpdateFile from "../components/upload-file/UpdateFile"
import {ADMIN_EMAIL}  from '../utils/config'
import avatar from '../assets/images/avatar.jpg'
const DocumentDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const { id } = useParams()
    const reviewsMsgref = useRef('')
    const { user, dispatch } = useContext(AuthContext)
    // console.log(`usuario: ${user.username} email: ${user.email}`)
    const [sureDeleted, setSureDeleted] = useState(false)
    const navigate = useNavigate()
    const { data: document } = useFetch(`${BASE_URL}/documents/${id}`)
    console.log(`document found: ${document.title}`)

    const { title, subject, semester, documentUrl, desc, reviews, useremail, username } = document
    const options = { day: "numeric", month: "long", year: "numeric" }

    reviews ? (console.log(`revies: ${reviews}`)) : (console.log('no hay reviews:'))

    
    user ? (console.log('inicio sesion')): console.log('no ha iniciado sesion') 

    if (!document) {
        return <div>Loading...</div>;
    }

    const actualizarHandler = async (e, id) => {
        e.preventDefault()
    }
    const submitHandler = e => {
        e.preventDefault()
        const reivewText = reviewsMsgref.current.value
        alert(`${reivewText}`)
    }
    const eliminarHandler = async (e, id) => {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`${BASE_URL}/documents/${id}`, {
                    method: "DELETE"
                });


                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                navigate('/');




            }
        })
    }


    if (user) {
        console.log(`email owner: ${useremail}`)
    }

    return (

        <>


            <Container>
                <Row>

                    <Col lg='8'>
                        <div className="document__content">
                            <embed src={documentUrl} type="application/pdf" width="100%" height="600px"></embed>
                            <div className="document__info">
                                <h2>{title}</h2>
                                <div className="d-flex  align-items-center gap-5" >

                                    <span>
                                        <i class="ri-book-2-fill"></i> {subject}
                                    </span>
                                    <span>
                                        <i class="ri-book-2-fill"></i> Semestre({semester})
                                    </span>

                                </div>
                                <div>
                                    <span>
                                        <i class="ri-map-pin-user-fill"></i> By ({username})
                                    </span>
                                    <h5>Description</h5>
                                    <p>{desc}</p>


                                </div>

                                <Col lg='2'>
                                    {user && (user.email === useremail || user.email === ADMIN_EMAIL) && (
                                        <ButtonGroup>
                                            <Button color="danger" className="mr-1" onClick={(e) => eliminarHandler(e, id)}>Eliminar</Button>
                                            <Button color="primary" onClick={handleOpenModal}>Actualizar</Button>
                                            {isModalOpen && <UpdateFile document={document} onClose={handleCloseModal} />}
                                        </ButtonGroup>
                                    )}
                                </Col>

                                {/* Reviews start  */}
                                <div className="document_reviews mt-4">
                                    <h4>Reviews ({reviews?.length})</h4>
                                    <Form onSubmit={submitHandler}>

                                        <div className="review__input">
                                            <input type="text" ref={reviewsMsgref} placeholder="share your thoughts" required></input>
                                            <button className="btn primary__btn text-white" type="submit">Submit </button>
                                        </div>
                                    </Form>

                                    <ListGroup className="user__reviews">
                                        {
                                            reviews?.map(review => (
                                                <div className="review__item">
                                                    <img src={avatar} alt=""></img>

                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <h4>Usuario: {review.username}</h4>
                                                            <h5>{review.reivewText}</h5>
                                                            <p>{new Date('03-22-2023').toLocaleDateString("en-US", options)}</p>
                                                        </div>



                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </ListGroup>

                                </div>

                                {/* reviews end  */}
                            </div>

                        </div>
                    </Col>
                    <Col lg='4'>
                        <UploadFile document={null}></UploadFile>

                    </Col>

                </Row>
            </Container>
        </>

    )
}

export default DocumentDetails

