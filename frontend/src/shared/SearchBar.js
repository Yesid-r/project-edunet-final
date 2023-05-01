import React, {  useRef } from 'react';
import './search-bar.css'
import {Col, Form, FormGroup} from "reactstrap"
import{BASE_URL} from './../utils/config'
import {useNavigate} from 'react-router-dom'

const SearchBar = () => {
    const subjectRef = useRef('')
    const semesterRef = useRef(0)
    const navigate = useNavigate()

    const searchHandler = async ()=>{
        const subject = subjectRef.current.value
        const semester = semesterRef.current.value
        
        if(subject === ''||semester ==='' ){
            return alert('all fields are required!')
        }


        const res = await fetch(`${BASE_URL}/documents/search/getDocumentBySearch?subject=${subject}&semester${semester}`)
        if(!res.ok) alert('Something went wrong')

        const result = await res.json()
        navigate(`/documents/search?subject=${subject}&semester=${semester}`, {state: result.data})
    }


        return (
        <Col lg="12">
        <div className = "search__bar">
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span ><i class="ri-book-2-fill"></i> </span>
                    <div>
                        <h6>Subject</h6>
                        <input type = "text" placeholder='wich subject you want?' ref={subjectRef}></input>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span ><i class="ri-draft-line"></i> </span>
                    <div>
                        <h6>Semester</h6>
                        <input type = "number" placeholder='semester' ref={semesterRef}></input>
                    </div>
                </FormGroup>
                <span className="search__icon" type="submit" onClick={searchHandler}>
                <i class="ri-search-line"></i>
                </span>
            </Form>

        </div>
        </Col>
        );
};
export default SearchBar;