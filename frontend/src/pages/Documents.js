import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import { Container, Row , Col, Button } from 'reactstrap';
import SearchBar from '../shared/SearchBar';
import DocumentCard from '../shared/DocumentCard';
//import documentData from '../assets/data/documents';
import useFetch from './../hooks/useFetch'
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

import '../styles/document.css';

const Documents = () => {
    const navigate = useNavigate()

    const[pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect (()=>{
        const pages = Math.ceil(5/4) ;
        setPageCount(pages);
    },[page])
    const handleClick = e =>{
        e.preventDefault();
        navigate('/uploadFile-page')
    }
    const { data: documentData, loading, error } = useFetch(`${BASE_URL}/documents/`)
    return (
        <>
        
            <CommonSection title="all documents"/>
            <section >
                <Container>
                    <Row>
                        <SearchBar/>
                    </Row>
                    <Button className='btn primary__btn w-100 w-100 mt-4' onClick={handleClick}>Upload</Button>
                </Container>
            </section>
            <section >
                <Container>
                    <Row>{
                        
                        documentData ?.map(document => <Col lg='3' className='mb.4' key={document.id}>
                            
                        <DocumentCard document={document}/> 
                        </Col>)
                        }
                        
                        <Col lg="12">
                            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap3">
                                {
                                    [...Array(pageCount).keys()].map(number =>(
                                        <span key={number} onClick={() => setPage(number)} className={page=== number ? 'active__page': ''}>
                                            {number + 1}
                                        </span>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </section>
            </>  
    );
};

export default Documents;