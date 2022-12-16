import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Tab,
  Row,
  Col,
  Nav,
  Form,
  Card,
  Stack,
} from 'react-bootstrap';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import PageNav from '../../components/Nav';
import CheckListRe from '../CheckList/CheckList_re';
import BudgetRe from '../Budget/Budget_re';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { imageUpdate } from '../../store/modules/users';

const formData = new FormData();

export default function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const nickName = params.nickName;
  const option = params.option;

  const dispatch = useDispatch();
  const updateUserImage = useSelector((state) => state.users.userImageUpdate);

  //위 state를 success 하나로 바꾸기
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  // 이미지 저장
  const [userData, setUserData] = useState([]);
  const [imgUpload, setImgUpload] = useState(false);

  // 데이터 받아오기
  useEffect(() => {
    axios
      .get(`http://localhost:4000/mypage/${nickName}/${option}`)
      .then((res) => {
        setSuccess(true);
        setData(res.data);
      });
  }, [nickName, option]);

  // 이미지 가져오기
  useEffect(() => {
    axios
      .post('http://localhost:4000/user', { nickName })
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        new Error('통신에러')
      });
  }, [setUserData, nickName, updateUserImage]); //무한 랜더링 막기 위해서 userData가 아닌 setUserData로 수정

  // 이미지 업로드

  const imgRef = useRef();
  const handleImg = (e) => {
    formData.append('image', e.target.files[0]);
  };
  const userUploadImage = () => {
    axios
      .post('http://localhost:4000/user/image', formData)
      .then((response) => response.data)
      .then((data) => {
        axios
          .post('http://localhost:4000/user/upload', [
            { nickName, image: data },
          ])
          .then(() => {
            alert('이미지가 등록되었습니다.');
            setImgUpload(true);
            dispatch(imageUpdate(data));
            imgRef.current.value = '';
          })
          .catch(() => {
            new Error('실패');
          });
      });
  };

  const onErrorImg = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/images/defaultImage.png';
  };

  if (success) {
    return (
      <>
        <PageNav />
        <Container
          style={{ marginTop: '50px' }}
          className="d-flex justify-content-center col-lg-9"
        >
          <Row xs={1} sm={1} md={1}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="trip">
              {/* 가로 nav tab */}
              <Col className="col-lg-3">
                {userData.image !== '' ? (
                  <img
                    src={`http://localhost:4000/uploads/${userData.image}`}
                    alt="회원 이미지"
                    style={{ width: '13rem', height: '13rem' }}
                    className="bg-dark rounded text-center d-block m-auto"
                  />
                ) : (
                  <img
                    onError={onErrorImg}
                    src=""
                    style={{ width: '13rem', height: '13rem' }}
                    className="bg-dark rounded text-center d-block m-auto"
                    alt="유저프로필에러"
                  />
                )}
                <p className="fs-3 text-center text-success fw-bold m-2">
                  {nickName}
                </p>
                {imgUpload === true ? null : (
                  <div className="d-flex">
                    <Form.Control
                      style={{ fontSize: '8px', margin: '20px' }}
                      type="file"
                      ref={imgRef}
                      name="image"
                      onChange={handleImg}
                    />
                    <button className="btn" onClick={userUploadImage}>
                      <FaCheck className="text-dark" />
                    </button>
                  </div>
                )}
                <TabContainer>
                  <Nav
                    variant="pills"
                    className="flex-column mt-4 text-center"
                    style={{ color: '#333' }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="trip"
                        onClick={() => {
                          navigate(`/MyPage/${nickName}/plans`);
                        }}
                      >
                        여행 조회
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="checklist"
                        onClick={() => {
                          navigate(`/MyPage/${nickName}/checklist`);
                        }}
                      >
                        체크리스트
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="budget"
                        onClick={() => {
                          navigate(`/MyPage/${nickName}/charge`);
                        }}
                      >
                        가계부
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="review"
                        onClick={() => {
                          navigate(`/MyPage/${nickName}/review`);
                        }}
                      >
                        리뷰
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </TabContainer>
              </Col>

              <Col className="col-lg-9" style={{ width: '75%' }}>
                <Tab.Content>
                  {/* 여행 조회 */}
                  <Tab.Pane eventKey="trip">
                    <Row className="m-auto">
                      <h1
                        className="fw-bold lh-base mt-2 mb-4 m-auto"
                        style={{ width: '75%' }}
                      >
                        <span style={{ color: '#198754' }}>{nickName}</span>
                        <span>님의</span>
                        <br></br>
                        <span>여행🛫 일정입니다</span>
                      </h1>
                      <Row className="d-flex w-75 m-auto">
                        {/* 어떤 option이든 data에 값이 들어가기 때문에 조건문 추가/ state 뒤에 ? 없으면 이전 data로 그리려다가 undefined 에러  */}
                        {option === 'plans' ? (
                          data.length === 0 ? (
                            <p>여행 계획이 없습니다</p>
                          ) : (
                            data[0].state?.planDate.period.map(function (a, i) {
                              return (
                                <Container xl={5} className="my-3 " key={i}>
                                  <Card className="m-2">
                                    <Row className="d-flex justify-content-center flex-wrap">
                                      <Col
                                        md={7}
                                        className="d-flex text-center"
                                      >
                                        <p
                                          className="fw-6 fw-bold w-75 m-auto my-3 text-center bg-success rounded p-2"
                                          style={{ color: '#fff' }}
                                        >
                                          day {i + 1}
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row className="m-3">
                                      <Stack className="d-flex flex-column my-auto text-center">
                                        {data[0].state.planItems[i].map(
                                          function (b, j) {
                                            return (
                                              <div
                                                style={{
                                                  backgroundColor: '#fafafa',
                                                  padding: '1rem',
                                                }}
                                                key={j}
                                              >
                                                <Title className="m-1 fs-6">
                                                  {
                                                    data[0].state.planItems[i][
                                                      j
                                                    ].title
                                                  }
                                                </Title>
                                                <Title
                                                  className="m-1"
                                                  style={{ fontSize: '12px' }}
                                                >
                                                  {
                                                    data[0].state.planItems[i][
                                                      j
                                                    ].addr1
                                                  }
                                                </Title>
                                                <div
                                                  style={{ color: '#1A8754' }}
                                                ></div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </Stack>
                                    </Row>
                                  </Card>
                                </Container>
                              );
                            })
                          )
                        ) : (
                          <div>계획한 여행이 아직 없습니다</div>
                        )}
                      </Row>
                    </Row>
                  </Tab.Pane>

                  {/* 체크리스트 조회 */}
                  <Tab.Pane eventKey="checklist">
                    <Container className="m-auto mx-5 col-9">
                      <h1
                        className="fw-bold lh-base mt-2 mb-4 m-auto"
                        style={{ width: '90%' }}
                      >
                        <span style={{ color: '#198754' }}>{nickName}</span>
                        <span>님의</span>
                        <br></br>
                        <span>체크리스트📝 입니다.</span>
                      </h1>
                    </Container>
                    {data.length === 0 ? (
                      <p>작성한 체크리스트가 없습니다</p>
                    ) : (
                      <CheckListRe />
                    )}
                  </Tab.Pane>

                  {/* 가계부 조회*/}
                  <Tab.Pane eventKey="budget">
                    <Container className="m-auto mx-5 col-9">
                      <h1
                        className="fw-bold lh-base mt-2 mb-4 m-auto"
                        style={{ width: '90%' }}
                      >
                        <span style={{ color: '#198754' }}>{nickName}</span>
                        <span>님의</span>
                        <br></br>
                        <span>정산💸내역입니다.</span>
                      </h1>
                    </Container>
                    {data.length === 0 ? (
                      <p>작성한 가계부가 없습니다</p>
                    ) : (
                      <BudgetRe />
                    )}
                  </Tab.Pane>

                  {/* 리뷰 조회 */}
                  <Tab.Pane eventKey="review">
                    <Row className="m-auto">
                      <h1
                        className="fw-bold lh-base mt-2 mb-4 m-auto"
                        style={{ width: '75%' }}
                      >
                        <span style={{ color: '#198754' }}>{nickName}</span>
                        <span>님의</span>
                        <br></br>
                        <span>리뷰✏️ 입니다</span>
                      </h1>

                      <Row className="d-flex w-75 m-auto">
                        {option === 'review' && data.length === 0 ? (
                          <p>작성한 리뷰가 없습니다</p>
                        ) : (
                          data.map(function (b, j) {
                            return (
                              <>
                                <Row
                                  key={j}
                                  className="m-auto text-center w-75 shadow-sm"
                                  style={{ fontSize: '12px' }}
                                >
                                  <Card className="mt-3">
                                    <Card.Body>
                                      <Card.Title
                                        className="mb-3 fs-6 bg-success text-light w-50 p-1 m-5 m-auto rounded"
                                        key={j}
                                      >
                                        {data[j].title}
                                      </Card.Title>
                                      <div className="d-flex">
                                        <div className="border rounded w-50">
                                          <p className="mb-2 text-muted">
                                            {/* {data[j].dateFull.slice(0, 10)} */}
                                            {data[j].dateFull}
                                          </p>
                                          <Card.Text className="mb-2">
                                            ⭐⭐⭐⭐⭐
                                            <span> {data[j].star} </span>
                                            ❤👍🏼 조회수{' '}
                                            <span>{data[j].view}</span>
                                          </Card.Text>
                                        </div>

                                        <div className="w-50 ms-2 border rounded">
                                          <Card.Text className=" d-flex align-items-center justify-content-center h-100 fs-6">
                                            {data[j].content}
                                          </Card.Text>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Row>
                              </>
                            );
                          })
                        )}
                      </Row>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const Title = styled.p`
  font: 2rem/1 'Inter';
`;

const TabContainer = styled.div`
  .nav-pills .nav-link {
    color: #198754;
  }
  .nav-pills .nav-link.active {
    color: #fff;
    background-color: #198754;
  }
`;
