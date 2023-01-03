import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlanList from '../../components/Plan/PlanList';
import SelectList from '../../components/Plan/SelectList';
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Stack,
} from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Welcome from './Welcome';
import { addPlanItems } from '../../store/modules/triplog';
import { useDispatch, useSelector } from 'react-redux';

let pickMap = [
  { areacode: '1', MapY: '127.04', MapX: '37.59' },
  { areacode: '6', MapY: '129.16', MapX: '35.15' }, //부산
  { areacode: '32', MapY: '128.89', MapX: '37.79' }, //강원
  { areacode: '35', MapY: '129.33', MapX: '35.78' }, //경주
  { areacode: '37', MapY: '127.15', MapX: '35.81' }, //전주
  { areacode: '39', MapY: '33.368', MapX: '126.54' }, //제주
];

export default function Plan() {
  for (let i = 0; i < pickMap.length; i++) {
    for (let j = 0; j < pickMap[i].length; j++) {
      if (pickMap[i][j].find((el) => el.areacode === areaCode) !== undefined) {
      }
    }
  }

  const savehandler = () => {
    axios
      .post('http://13.125.234.1:4000/plan', { state, nickName })
      .then((res) => {
        alert('여행 계획이 저장되었습니다');
      })
      .catch(() => {
        throw new Error('여행 계획 일정 전송실패');
      });
  };

  const params = useParams();
  const areaCode = params.areaCode;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.triplog);
  const nickName = useSelector((state) => state.users.userNickName);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onErrorImg = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/images/submain/경주.png';
  };

  // * 지도
  // 검색한 여행지 저장을 위한 State
  const [search, setSearch] = useState([]);

  // input에 입력한 값
  const inputRef = useRef();

  // 클릭 한 여행지 저장을 위한 State
  const [list] = useState([]);

  const [productItems] = useState([]); //받아온데이터 담기
  const [planItems, setPlanItems] = useState([]);

  return (
    <>
      <Nav />
      <Welcome />
      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>TripLog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="col-sm-10 col-md- overflow-auto m-auto">
            <Row className="d-flex justify-content-center">
              <Col
                md={{ span: 4, offset: 2 }}
                className="text-end d-block"
              ></Col>
            </Row>

            {/* 여행지 검색 기능 */}
            <Row className="m-auto py-4 d-flex text-center">
              <div className="text-center">
                <div
                  className="text-center fs-4 m-4"
                  style={{ fontFamily: 'ChosunBg' }}
                >
                  🛫 우리만의 여행, TripLog
                </div>
                <div className="text-center fs-6 m-4">
                  가고 싶은 여행지를 추가해보세요
                </div>
                <input
                  onKeyPress="if(event.keyCode == 13){enterKey()}"
                  type="text"
                  placeholder=" 여행지 검색"
                  ref={inputRef}
                  className="m-1 d-inline"
                  style={{
                    width: '200px',
                    height: '40px',
                    boxSizing: 'border-box',
                    outlineWidth: '2px',
                    outlineColor: '#198754',
                  }}
                />
                <Button
                  type="button"
                  style={{ backgroundColor: '#036635' }}
                  className="btn btn-success m-1"
                  onClick={() => {
                    // input에 입력한 값 useRef
                    const text = inputRef.current.value;
                    axios
                      .get(
                        `https://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&areaCode=${areaCode}&keyword=${text}`
                      )
                      .then((결과) => {
                        // 재 검색 마다 search 값을 삭제 시켜줌
                        search.splice(0, search.length);
                        let copy = [
                          ...search,
                          ...결과.data.response.body.items.item,
                        ];
                        setSearch(copy);
                      })
                      .catch(() => {
                        throw new Error('에러 발생');
                      });
                  }}
                >
                  검색
                </Button>
              </div>

              {
                //search의 map
                search.map(function (a, i) {
                  return (
                    <SelectBox
                      className="d-block m-auto w-75 p-3"
                      onClick={() => {
                        // copy를 사용하지 않고 선택된 장소의 정보만 전달하도록
                        const pickedPlace = {
                          title: a.title,
                          Image: a.firstimage,
                          addr1: a.addr1,
                          mapx: parseFloat(a.mapx),
                          mapy: parseFloat(a.mapy),
                        };
                        dispatch(
                          addPlanItems({
                            pickedPlace,
                            idx: state.planDateIdx,
                          })
                        );
                      }}
                      key={i}
                    >
                      <div className="d-flex w-100 text-start">
                        <Stack
                          onClick={() => {
                            let copy = [
                              ...list,
                              {
                                title: a.title,
                                Image: a.firstimage,
                                addr1: a.addr1,
                                mapx: parseFloat(a.mapx),
                                mapy: parseFloat(a.mapy),
                              },
                            ];
                            dispatch(
                              addPlanItems({ copy, idx: state.planDateIdx })
                            );
                          }}
                        >
                          <img
                            src={a.firstimage}
                            style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                            }}
                            onError={onErrorImg}
                            alt=""
                          ></img>
                        </Stack>

                        <Stack className="d-flex flex-column">
                          <Title className="m-1 fs-6">{a.title}</Title>
                          <Title className="m-1" style={{ fontSize: '12px' }}>
                            {a.addr1}
                          </Title>
                        </Stack>
                      </div>
                    </SelectBox>
                  );
                })
              }
            </Row>

            {/* 여행지 리스트 보여주기 */}
            <Row className="m-3" gap={3}>
              {productItems.length > 0 ? (
                <SelectList
                  productItems={productItems}
                  setPlanItems={setPlanItems}
                  planItems={planItems}
                  search={search}
                  setSearch={setSearch}
                />
              ) : null}
            </Row>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            닫기
          </Button>

          <Button
            style={{ backgroundColor: '#036635' }}
            onClick={() => {
              handleClose();
            }}
          >
            선택 완료
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="d-flex justify-content-start col-9">
        <Button
          className="btn d-block btn-dark mt-3 mb-1"
          onClick={() => {
            savehandler();
            alert('이전 여행 계획은 사라지고 새로운 여행 계획이 저장됩니다');
          }}
        >
          여행 계획 저장하기
        </Button>
      </Container>
      {/* 여행계획 짜는 컴포넌트 */}
      <Container className="d-flex flex-wrap justify-content-center overflow-scroll col-10">
        <PlanList
          productItems={productItems}
          setPlanItems={setPlanItems}
          planItems={planItems}
          onClick={handleShow}
        />
      </Container>
      <TriplogTitle className="d-block">TripLog</TriplogTitle>
      <TriplogTitle1 className="d-block">TripLog</TriplogTitle1>
      <Footer />
    </>
  );
}

// style-components
const Title = styled.p`
  font: 2rem/1 'Inter';
`;

const SelectBox = styled.div`
  display: flex;

  &:hover {
    border-radius: 10px;
    background-color: rgba(3, 102, 53, 0.3);
    cursor: pointer;
  }
`;

const TriplogTitle = styled.p`
  position: absolute;
  top: 150px;
  right: 100px;
  transform: rotate(-8deg);
  color: #5d835d;
  opacity: 0.2;
  font-family: 'ChosunBg';
  font-size: 140px;
  background-color: #c0dac0;
  border-radius: 10px;
  padding: 20px 25px;

  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
    opacity: 0;
  }
  @media screen and (max-width: 576px) {
    opacity: 0;
  }
`;
const TriplogTitle1 = styled.p`
  position: absolute;
  top: 560px;
  right: 100px;
  transform: rotate(5deg);
  color: #5d835d;
  opacity: 0.2;
  font-family: 'ChosunBg';
  font-size: 120px;
  background-color: #c0dac0;
  border-radius: 10px;
  padding: 20px 25px;
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
    opacity: 0;
  }
  @media screen and (max-width: 576px) {
    opacity: 0;
  }
`;
