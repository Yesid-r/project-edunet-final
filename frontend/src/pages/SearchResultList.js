import React, {useState} from 'react'
import ComonSection from './../shared/CommonSection'
import { Container, Row , Col} from 'reactstrap'
import {useLocation} from 'react-router-dom'
import DocumentCard from './../shared/DocumentCard'

const SearchResultList = () => {
  const location = useLocation()
  const [data] = useState(location.state)
  return (
    <>
      <ComonSection title={'Document search result'} />

      <section>
        <Container>

          <Row>
            {data.length === 0 ? <h4 className='text-center'>Not document found</h4>: data ?.map(document =>
              <Col lg='3' className='mb-4' key={document._id}><DocumentCard document={document}/> </Col>)}
          </Row>

        </Container>
      </section>
    </>
  )
}

export default SearchResultList 