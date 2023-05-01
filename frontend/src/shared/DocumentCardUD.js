import React from 'react'
import "./document-card.css";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import docImg from "../assets/images/miniatura pdf.png"
//import CalculateAvgRating from "../utils/avgRating";
import './document-card.css'

const DocumentCardUD = () => {

  return (
    <div className="document__card">
    <Card>
        <div className="document__img">
            <img src={docImg} alt="" />
        </div>
        <CardBody>
        <div className="card__top d-flex align-items-center justify-content-between">
            <span className="document__location d-flex align-items-center gap-1">
                {console.log(subject)}
            <i class="ri-book-2-fill"></i>{subject}
        </span>
        </div>
        <h5 className="document__title"><Link to={`/documents/${_id}`}>{title}</Link></h5>
        <div className="card__bottom d-flex align-items-center justify-content-beetween mt-3">
            
            <button className="btn booking__btn"><Link to={`/documents/${_id}`}>show more..</Link></button>
        </div>
    </CardBody>
    </Card>
    
</div>
  )
}

export default DocumentCardUD