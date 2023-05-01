import React, { useState, useContext } from 'react'
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

import Swal from 'sweetalert2'


const Register = () => {
    const[credentials, setCredentias] = useState({
        username:undefined,
        email:undefined,
        password:undefined
    })
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange  = e =>{
        setCredentias(prev =>({...prev, [e.target.id]:e.target.value}))
    }
    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            const credentialsJson = JSON.stringify(credentials)
            console.log(`credentials: ${credentialsJson}`)
            const res = await fetch(`${BASE_URL}/auth/register`, {method:'post',headers:{'content-type':'application/json'},body:credentialsJson})
            console.log(`credentials: ${credentials.email}`)
            const result = await res.json()
            console.log(result)

            Swal.fire({
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 2500
              })
            
            if(!res.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message,
                    
                  })
            }

            dispatch({type:'REGISTER_SUCCES'})
            navigate('/login')
        } catch (error) {
            alert(error.message)
        }
    }
  return <section>
    <Container>
        <Row>
            <Col lg = '8' className='m-auto'>
                <div className='login__container d-flex justify-content-between'>
                    <div className='login__img'>
                        <img src={registerImg} alt =""></img>
                    </div>
                    <div className='login__form'>
                        <div className='user'>
                            <img src={userIcon} alt = ""/>
                        </div>
                        <h2>Register</h2>
                        <Form onSubmit={handleClick}>
                        <FormGroup>
                                <input type='text' placeholder='user name' required id = "username" onChange={handleChange}></input>
                            </FormGroup>
                            <FormGroup>
                                <input type='text' placeholder='Email' required id = "email" onChange={handleChange}></input>
                            </FormGroup>
                            <FormGroup>
                                <input type='password' placeholder='Password' required id = "password" onChange={handleChange}></input>
                            </FormGroup>
                            <Button className='btn secontary_btn auth__btn' type='submit'>Create account</Button>
                        </Form>
                        <p>Already have an account? <Link to ='/login'>Login</Link></p>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Register;
