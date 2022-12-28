import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  Modal,
} from 'react-bootstrap';
import { FaArrowAltCircleUp, FaTrash } from 'react-icons/fa';
import { chargeUpdate } from '../../store/modules/budget';

export default function Budget() {
  const dispatch = useDispatch();

  const nickName = useSelector((state) => state.users.userNickName);

  const updateCharge = useSelector((state) => state.budget.chargeUpdate)

  const textRef = useRef();
  const chargeRef = useRef();
  const dateRef = useRef();

  const [chargeData, setChargeData] = useState();

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState(1);

  const handleClose = () => setShow(false);

  let totalCharge = [];

  if (chargeData !== undefined) {
    totalCharge = chargeData?.reduce((acc, cur, i) => {
      return cur.charge + acc;
    }, 0);
  }

  const addUserNum = () => {
    setUsers(users + 1);
  };

  useEffect(() => {
    axios
      .post('http://localhost:4000/charge', { nickName })
      .then((res) => {
        setChargeData(res.data.chargeList);
        setLoad(true);
      })
      .catch(() => new Error('통신에러'));
  }, [nickName, updateCharge]);

  const resetBudget = () => {
    axios
      .post(`http://localhost:4000/charge/alldelete`, {
        nickName,
        chargeData,
      })
      .then(() => {
        dispatch(chargeUpdate());
        setShow(false);
      })
      .catch(() => new Error('통신에러'));
  };

  const addBudget = () => {
    const date = dateRef.current.value;
    const title = textRef.current.value;
    const charge = chargeRef.current.value;
    axios
      .post(`http://localhost:4000/charge/write`, {
        chargeList: { date, title, charge: parseInt(charge) },
        nickName,
      })
      .then(() => {
        dispatch(chargeUpdate());
        alert('여행 지출 내역 등록을 성공하였습니다🙌');
        dateRef.current.value = '';
        textRef.current.value = '';
        chargeRef.current.value = '';
      })
      .catch(() => {
        alert('여행 지출 내역 등록을 실패하였습니다. 다시 시도해주세요.');
      });
  };

  if (load) {
    return (
      <>
        <Nav />
        <Container className="col-lg-8 ">
          <Row xs={1} sm={1} md={1} lg={2}>
            {/* 왼쪽 입력칸 */}
            <Col className="align-self-center px-5 mb-4">
              <h1 className="fw-bold lh-base mt-5 mb-4">
                <span style={{ color: '#198754' }}>{nickName}</span>
                <span>님의</span>
                <br></br>
                <span>
                  정산
                  <img
                    src="/images/icons/budget.png"
                    alt="정산내역"
                    style={{ width: '3rem' }}
                  />
                  내역입니다.
                </span>
              </h1>
              <p className="mb-4">
                일행과 함께 지출한 비용이 있다면,
                <br /> 총무에게 내야 할 금액을 정산해드려요.
              </p>

              <p className="fw-bold">날짜</p>
              <InputGroup size="md" className="mb-1 ">
                <Form.Control type="date" required ref={dateRef} />
              </InputGroup>
              <br />
              <p className="fw-bold">내용</p>
              <InputGroup size="md" className="mb-3">
                <Form.Control type="text" required ref={textRef} />
              </InputGroup>
              <br />
              <p className="fw-bold">금액</p>
              <InputGroup size="md" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="숫자만 입력됩니다."
                  required
                  ref={chargeRef}
                />
              </InputGroup>
              <Row className="d-flex justify-content-between ">
                <Col>
                  <Button
                    variant="success"
                    className="text-end"
                    onClick={addBudget}
                  >
                    등록
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* 오른쪽 영수증 */}
            <Col
              className=" p-5 rounded border mt-4"
              style={{ backgroundColor: '#fafafa' }}
            >
              <h6 className="fw-bold text-center" style={{ color: '#198754' }}>
                TripLog
              </h6>
              <h2 className="fw-bold text-center">RECEIPT</h2>

              <hr className="solid" style={{ borderTopWidth: '2px' }}></hr>

              <Row className=" mb-2 mx-1">
                <Col className="fw-bold col-3">Day</Col>
                <Col className="fw-bold col-5 text-center">ITEM</Col>
                <Col className="fw-bold col-2 text-center ">Price</Col>
                <Col className="fw-bold col-2 text-end">Del</Col>
              </Row>
              <hr className="solid"></hr>

              {chargeData &&
                chargeData.map(function (a, i) {
                  return (
                    <Row className="mx-1" key={i}>
                      <Col className="col-3">
                        <p>{a.date.slice(5, 10)}</p>
                      </Col>
                      <Col className="col-5 text-center">{a.title}</Col>
                      <Col className="col-2 text-center">
                        {a.charge?.toLocaleString('ko-KR', {
                          currency: 'KRW',
                        })}
                      </Col>
                      <Col
                        className="col-2 text-end"
                        style={{ cursor: 'pointer' }}
                      >
                        <FaTrash
                          style={{ color: 'grey' }}
                          onClick={() => {
                            axios
                              .post('http://localhost:4000/charge/delete', {
                                nickName,
                                a,
                              })
                              .then(() => {
                                dispatch(chargeUpdate());
                                alert('지출 내역 삭제를 성공하였습니다🙌');
                              })
                              .catch(() => new Error('통신에러'));
                          }}
                        />
                      </Col>
                    </Row>
                  );
                })}

              <hr className="dashed" style={{ borderTop: 'dashed' }}></hr>
              <Row>
                <Col sm md lg="auto" className="fw-bold">
                  ITEM COUNT :
                </Col>
                <Col className="text-end">
                  {chargeData === [] ? 0 : chargeData.length}개
                </Col>
              </Row>

              <Row>
                <Col className="fw-bold">
                  정산 : {users} 명 {'\u00A0'}
                  <FaArrowAltCircleUp
                    onClick={addUserNum}
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
              <Col className="text-end">
                <Button variant="success" onClick={() => setShow(true)}>
                  초기화
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
        <Footer />

        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton>
              <Modal.Title>영수증 초기화 버튼입니다!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>초기화하시면 다시는 영수증 데이터를 불러올 수 없어요!!</p>
              <p>
                정말
                <span className="fw-bold" style={{ color: '#198754' }}>
                  초기화
                </span>
                하시겠습니까?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={resetBudget}>
                초기화
              </Button>
              <Button variant="success" onClick={handleClose}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
      </>
    );
  }
}
