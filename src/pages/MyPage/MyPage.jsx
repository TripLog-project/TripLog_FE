import { useState, useEffect, useRef } from 'react';
import { Container, Tab, Row, Col, Nav, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import PageNav from '../../components/Nav';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { imageUpdate } from '../../store/modules/users';
import MyBudget from './MyBudget';
import MyCheckList from './MyCheckList';
import MyReview from './MyReview';
import Myplan from './Myplan';

const formData = new FormData();

export default function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const nickName = params.nickName;
  const option = params.option;

  const dispatch = useDispatch();
  const updateUserImage = useSelector((state) => state.users.userImageUpdate);
  const updateCheckList = useSelector((state) => state.check.checkUpdate);

  //위 state를 success 하나로 바꾸기
  const [data, setData] = useState([]);

  // 이미지 저장
  const [userImage, setUserImage] = useState([]);
  const [imgUpload, setImgUpload] = useState(false);

  // 데이터 받아오기
  useEffect(() => {
    axios
      .get(`http://localhost:4000/mypage/${nickName}/${option}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        new Error('통신에러');
      });
  }, [nickName, option, updateCheckList]);

  // 이미지 가져오기
  useEffect(() => {
    axios
      .post('http://localhost:4000/mypage/userimage', { nickName })
      .then((res) => {
        setUserImage(res.data.image);
      })
      .catch(() => {
        new Error('통신에러');
      });
  }, [nickName, updateUserImage]); //무한 랜더링 막기 위해서 userData가 아닌 setUserData로 수정

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

  return (
    <>
      <PageNav />
      <Container
        style={{ marginTop: '50px' }}
        className="d-flex justify-content-center col-lg-9"
      >
        <Row xs={1} sm={1} md={1}>
          <Tab.Container id="left-tabs-example" defaultActiveKey={`${option}`}>
            {/* 가로 nav tab */}
            <Col className="col-lg-3">
              {userImage !== '' ? (
                <img
                  src={`http://localhost:4000/uploads/${userImage}`}
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
                      eventKey="plans"
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
                      eventKey="charge"
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
                {(() => {
                  switch (option) {
                    case 'plans':
                      return <Myplan data={data} nickName={nickName} />;
                    case 'review':
                      return <MyReview data={data} nickName={nickName} />;
                    case 'checklist':
                      return <MyCheckList data={data} nickName={nickName} />;
                    case 'charge':
                      return <MyBudget data={data} nickName={nickName} />;
                    default:
                      return null;
                  }
                })()}
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

const TabContainer = styled.div`
  .nav-pills .nav-link {
    color: #198754;
  }
  .nav-pills .nav-link.active {
    color: #fff;
    background-color: #198754;
  }
`;
