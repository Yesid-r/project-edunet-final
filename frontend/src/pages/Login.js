import React, { useState, useContext } from 'react'
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'

import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import Swal from 'sweetalert2'

const Login = () => {
    const[credentials, setCredentias] = useState({
        email:undefined,
        password:undefined
    })

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange  = e =>{
        setCredentias(prev =>({...prev, [e.target.id]:e.target.value}))
    }
    const handleClick = async e =>{
        e.preventDefault();

        try {
            
            const res = await fetch(`${BASE_URL}/auth/login`, {method:'post',headers:{'content-type':'application/json'},credentials:'include',body:JSON.stringify(credentials)})
            console.log(`credentials: ${credentials.email}`)
            const result = await res.json()
            console.log(result)

            if(!res.ok) alert(result.message)

            Swal.fire({
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 2500
              })

            dispatch({type:'LOGIN__SUCCESS', payload:result.data})
            navigate('/')
        } catch (error) {
            dispatch({type:'LOGIN_FAILURE', payload:error.message})
        }
    }
  return <section>
    <Container>
        <Row>
            <Col lg = '8' className='m-auto'>
                <div className='login__container d-flex justify-content-between'>
                    <div className='login__img'>
                        <img src={loginImg} alt =""></img>
                    </div>
                    <div className='login__form'>
                        <div className='user'>
                            <img src={userIcon} alt = ""/>
                        </div>
                        <h2>Login</h2>
                        <Form onSubmit={handleClick}>
                            <FormGroup>
                                <input type='text' placeholder='Email' required id = "email" onChange={handleChange}></input>
                            </FormGroup>
                            <FormGroup>
                                <input type='password' placeholder='Password' required id = "password" onChange={handleChange}></input>
                            </FormGroup>
                            <Button className='btn secontary_btn auth__btn' type='submit'>Login</Button>
                        </Form>
                        <p>Don't have an account? <Link to ='/register'>Create</Link></p>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Login
