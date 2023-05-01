import React, { Component } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Documents from '../pages/Documents';
import DocumentDetails from '../pages/DocumentDetails';
import SearchResultList from '../pages/SearchResultList';
import UploadFile from '../components/upload-file/UploadFile';


class Routers extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Navigate to = '/home' />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/documents/:id" element={<DocumentDetails />} />
                <Route path="/documents/search" element={< SearchResultList />} />
                <Route path="uploadFile-page" element={<UploadFile/>} />
                <Route path='/documents/search/mydocuments' element={<SearchResultList/>} />

            </Routes>
        );
    }
}

export default Routers;