import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ListDetail from './ListDetail';

export default function List() {
  const navigate = useNavigate();

  const params = useParams();

  const region = params.region;
  const type = params.type;

  const [data, setData] = useState([]);
  const [okay, setOkay] = useState(false);

  const list1 = useRef();
  const list2 = useRef();
  const list3 = useRef();
  const list4 = useRef();
  const list5 = useRef();

  /* tourAPI */
  useEffect(() => {
    axios
      .get(`http://3.35.13.65:4000/list/${region}/${type}`)
      .then((response) => {
        setData(response.data);
        setOkay(true);
      });
  }, [region, type]);

  if (okay) {
    return (
      <>
        <Nav />
        <Container className="col-lg-9 col-md-9 col-sm-9">
          {/* ListsTAB */}
          <Row className="d-flex col-lg-8 col-md-8 col-xs-12 col-sm-10 justify-content-center mx-auto text-center mt-5 mb-5">
            <Col
              className="rounded"
              ref={list1}
              onClick={() => {
                navigate(`/list/${region}/sightseeing`);

                list1.current.style.border = '3px solid #198754';
                list2.current.style.border = 'none';
                list3.current.style.border = 'none';
                list4.current.style.border = 'none';
                list5.current.style.border = 'none';
              }}
              style={{ cursor: 'pointer' }}
            >
              <p className="fs-1 mb-1">🌴</p>
              <p className="fw-bold">관광</p>
            </Col>
            <Col
              className="rounded"
              ref={list2}
              onClick={() => {
                navigate(`/list/${region}/culture`);

                list2.current.style.border = '3px solid #198754';
                list1.current.style.border = 'none';
                list3.current.style.border = 'none';
                list4.current.style.border = 'none';
                list5.current.style.border = 'none';
              }}
              style={{ cursor: 'pointer' }}
            >
              <p className="fs-1 mb-1">🗿</p>
              <p className="fw-bold">문화</p>
            </Col>
            <Col
              ref={list3}
              className="rounded"
              onClick={() => {
                navigate(`/list/${region}/food`);

                list3.current.style.border = '3px solid #198754';
                list1.current.style.border = 'none';
                list2.current.style.border = 'none';
                list4.current.style.border = 'none';
                list5.current.style.border = 'none';
              }}
              style={{ cursor: 'pointer' }}
            >
              <p className="fs-1 mb-1">🍽</p>
              <p className="fw-bold">음식</p>
            </Col>
            <Col
              className="rounded"
              ref={list4}
              onClick={() => {
                navigate(`/list/${region}/lodgment`);

                list4.current.style.border = '3px solid #198754';
                list1.current.style.border = 'none';
                list2.current.style.border = 'none';
                list3.current.style.border = 'none';
                list5.current.style.border = 'none';
              }}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="fs-1 mb-1">🏠</div>
                <div className="fw-bold">숙소</div>
              </div>
            </Col>
            <Col
              className="rounded"
              ref={list5}
              onClick={() => {
                navigate(`/list/${region}/shopping`);

                list5.current.style.border = '3px solid #198754';
                list1.current.style.border = 'none';
                list2.current.style.border = 'none';
                list3.current.style.border = 'none';
                list4.current.style.border = 'none';
              }}
              style={{ cursor: 'pointer' }}
            >
              <p className="fs-1 mb-1">💵</p>
              <p className="fw-bold">쇼핑</p>
            </Col>
          </Row>

          <ListDetail props={data} region={region} />
        </Container>
        <Footer />
      </>
    );
  }
}
