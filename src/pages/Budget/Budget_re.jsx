import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function BudgetRe() {
  const updateCharge = useSelector((state) => state.budget.chargeUpdate)

  const [chargeData, setChargeData] = useState();
  const [users, setUsers] = useState(1);

  let totalCharge = [];
  if (chargeData !== undefined) {
    totalCharge = chargeData?.reduce((acc, cur, i) => {
      return cur.charge + acc;
    }, 0);
  }
  const nickName = useSelector((state) => state.users.userNickName);

  useEffect(() => {
    axios
      .post('http://localhost:4000/charge', { nickName })
      .then((res) => {
        setChargeData(res.data.chargeList);
      })
      .catch(() => new Error('통신에러'));
  }, [nickName, updateCharge]);

  return (
    <>
      <Container className="mx-5">
        <Col
          className=" p-5 m-auto rounded border mt-4"
          style={{ backgroundColor: '#fafafa', width: '90%' }}
        >
          <h6 className="fw-bold text-center" style={{ color: '#198754' }}>
            TripLog
          </h6>
          <h2 className="fw-bold text-center">RECEIPT</h2>

          <hr className="solid" style={{ borderTopWidth: '2px' }}></hr>

          <Row className=" mb-2 mx-1">
            <Col className="fw-bold col-3">Day</Col>
            <Col className="fw-bold col-6 text-center">ITEM</Col>
            <Col className="fw-bold col-3 text-center">Price</Col>
          </Row>
          <hr className="solid"></hr>

          {chargeData &&
            chargeData.map(function (a, i) {
              return (
                <Row className="mx-1" key={i}>
                  <Col className="col-3">
                    <p>{a.date.slice(5, 10)}</p>
                  </Col>
                  <Col className="col-6 text-center">{a.title}</Col>
                  <Col className="col-3 text-center">
                    {a.charge.toLocaleString('ko-KR', {
                      currency: 'KRW',
                    })}
                  </Col>
                </Row>
              );
            })}

          <hr className="dashed" style={{ borderTop: 'dashed' }}></hr>
          <Row>
            <Col sm md lg="auto" className="fw-bold">
              ITEM COUNT :
            </Col>
            <Col sm md lg="auto" className="text-end">{chargeData !== undefined ? chargeData.length : 0}개</Col>
          </Row>

          <Row>
            <Col className="fw-bold">
              정산 : {users} 명 {'\u00A0'}
              <FaArrowAltCircleUp
                onClick={() => {
                  setUsers(users + 1);
                }}
                style={{ cursor: 'pointer', color: '#198754' }}
              />
            </Col>
            <Col sm md lg="auto" className="text-end">
              1인당 {parseInt(totalCharge / users).toLocaleString('ko-KR', {currency: 'KRW'})}원
            </Col>
          </Row>

          <Row>
            <Col className="fw-bold">총 합계 : </Col>
            <Col sm md lg="auto" className="text-end">
              {totalCharge.toLocaleString('ko-KR', {
                currency: 'KRW',
              })}
              원
            </Col>
          </Row>
          <hr className="dashed" style={{ borderTop: 'dashed' }}></hr>
        </Col>
      </Container>
    </>
  );
}
