import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setAreaCode, setRegion } from '../../store/modules/triplog';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  let state = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const nickName = useSelector((state) => state.users.userNickName);
  const [cardText] = useState([
    '오랜만의 서울여행! 여행 포인트 ✨',
    '고즈넉한 가을 감성 강원의 대표 명소 7',
    "요즘 부산 가면 '이곳'에 꼭 들린대요",
    '잘 몰랐던 경주 지금이 떠날 기회!',
    '복잡한 서울? Trip Log로 한번에 해결!',
  ]);
  const [regionIcon] = useState([
    '/images/icons/seoul.png',
    '/images/icons/busan.png',
    '/images/icons/gangwon.png',
    '/images/icons/경주.png',
    '/images/icons/jeonju.png',
    '/images/icons/jeju.png',
  ]);
  const [regionName] = useState([
    '서울',
    '부산',
    '강원',
    '경주',
    '전주',
    '제주',
  ]);
  const regionAreacode = ['1', '6', '32', '35', '37', '39'];
  const regionCode = [
    'seoul',
    'busan',
    'gangneung',
    'gyeongju',
    'jeonju',
    'jeju',
  ];
  return (
    <>
      <Nav />
      <Container className="col-sm-12 col-9">
        <Container>
          <h1 className="fw-bold lh-base mt-5 mx-lg-5 fs-md-6">
            <span style={{ color: '#198754' }}>
              {nickName === '' ? '여행자' : nickName}
            </span>
            님,
            <br></br>TripLog에 오신걸 환영합니다! 👋
          </h1>

          <div className="mx-lg-5 mt-3">
            <Button
              size="sm"
              className="flex-fill mx-1 mb-2 border"
              onClick={() => {
                state.isLogin ? navigator('/budget') : navigator('/login');
              }}
              variant="outline-success"
            >
              #가계부
              <img
                src="/images/icons/budget.png"
                alt="가계부"
                style={{ width: '1.2rem' }}
              />
            </Button>
            <Button
              size="sm"
              className="flex-fill mb-2 mx-1 border "
              onClick={() => {
                state.isLogin ? navigator('/checklist') : navigator('/login');
              }}
              variant="outline-success"
            >
              #여행체크리스트
              <img
                src="/images/icons/check.png"
                alt="체크리스트"
                style={{ width: '1.2rem' }}
              />
            </Button>
          </div>
        </Container>

        <Row
          lg={6}
          md
          sm
          xs={3}
          className="d-flex col-lg-8 col-sm-8 mx-auto text-center mt-5"
        >
          {regionIcon.map((a, idx) => (
            <Col key={idx}
              onClick={() => {
                dispatch(setAreaCode(regionAreacode[idx]));
                dispatch(setRegion(regionCode[idx]));
                navigator(`/submain/${regionAreacode[idx]}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={regionIcon[idx]}
                alt={regionName[idx]}
                className="w-50"
              />
              <p className="fw-bold">{regionName[idx]}</p>
            </Col>
          ))}
        </Row>

        <Row sm xs={1} md={2} lg={4} className="g-4 mt-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Card style={{ border: 'none' }} onClick={() => {}}>
                <Card.Img
                  variant="top"
                  src={`/images/main/main_grid${idx}.jpg`}
                  className="p-0"
                />
                <Card.ImgOverlay className="p-0">
                  <Card.Body className="p-0">
                    <Card.Text
                      className="fw-bold fs-5 rounded p-4"
                      style={{
                        backgroundImage:
                          'linear-gradient(0deg, rgba(0, 0, 0, 0), #c8c8c8) ',
                        color: '#f6f6f6',
                      }}
                    >
                      {cardText[idx]}
                    </Card.Text>
                  </Card.Body>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
