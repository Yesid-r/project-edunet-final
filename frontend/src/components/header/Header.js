import React, { Component, useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.css'

import { AuthContext } from '../../context/AuthContext';

const nav__links = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: 'documents',
        display: 'Documents'
    }
]

const Header = () => {
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)
    user ? (console.log( `usuario: ${user.username} email: ${user.email}`) ) : console.log('no ha iniciado sesion')
    // console.log(`usuario: ${user.username}`)
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }
    return (

        <header className="header">
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        {/**======================Logo====================*/}
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        {/**======================Logo end====================*/}
                        {/**======================menu start====================*/}
                        <div className="navigation">
                            <ul className='menu d-flex align-items-center gap-5'>
                                {
                                    nav__links.map((item, index) => (
                                        <li className='nav__item' key={index}>
                                            <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                        </li>
                                    ))

                                }

                            </ul>
                        </div>
                        {/**======================menu end====================*/}
                        <div className='nav__right d-flex align-items-center gap-4'>
                            <div className='nav_btns d-flex align-items-center gap-4'>
                                {
                                    user ? (
                                        <>
                                        <h5 className='mb-0'>{user.username}</h5>
                                        <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                                    </>
                                    ) : (<>
                                        <Button className='btn secondary__btn'><Link to='/login'>Login</Link>
                                        </Button>
                                        <Button className='btn primary__btn'><Link to='/register'>Register</Link>
                                        </Button></>)
                                }

                            </div>
                            <span className='mobile__menu ' >
                                <i class="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header