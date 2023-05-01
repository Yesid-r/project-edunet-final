import React from 'react';
import DocumentCard from '../../shared/DocumentCard';
import documentData from '../../assets/data/documents'
import { Col } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import useFetch from '../../hooks/useFetch';

const FeaturedDocumentList = () => {

    const { data: featuredDocuments, loading, error } = useFetch(`${BASE_URL}/documents/`)

    return (
        <>
            {loading && <h4>Loading.............</h4>}
            {error && <h4>{error}</h4>}
            {

                !loading && !error && featuredDocuments?.map(document => (
                    <Col lg='3' className='mb-4' key={document._id}>
                        <DocumentCard document={document}></DocumentCard>
                    </Col>
                ))
            }
        </>
    );
};

export default FeaturedDocumentList;