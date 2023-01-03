import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import CalendarMain from './CalendarMain';
import Items from './Items';
import Items2 from './Items2';
import data from '../../data';
import { useParams } from 'react-router-dom';

export default function SubMain({ planDate }) {
  const params = useParams();
  const areaCode = params.areaCode;

  const [areaName] = useState(data);

  let h = 0;
  for (let i = 0; i < areaName.length; i++) {
    for (let j = 2; j < areaName[i].length; j++) {
      if (areaName[i][j].find((el) => el.areacode === areaCode) !== undefined) {
        h = i;
      }
    }
  }

  let pickAreaName = areaName[h][0];
  let pickAreaImg = areaName[h][1];

  return (
    <>
      <Nav />
      <Container className="overflow-x-hidden">
        <CalendarMain
          pickAreaName={pickAreaName}
          pickAreaImg={pickAreaImg}
          planDate={planDate}
        />

        <Items
          width="20rem"
          height="20rem"
          text="✨ 트랜디한 트립로그의 Pick!"
          subText="브이로그 감성 낭낭한 여행일지, 트립로그와 함께!"
        />

        <Container className="p-lg-3 p-md-0 mb-4 mt-lg-5 mt-md-0">
          <Row className="d-block justify-content-start">
            <Col className="m-3">
              <Title className="justify-content-start fw-bold">
                🧳 여행 전 필수 준비항목
              </Title>
              <SubTitle className="m-0 fs-6 text-secondary">
                트립로그가 챙겨주는 이번 여행!
              </SubTitle>
            </Col>
          </Row>
          <Row>
            <div className="d-block rounded text-center">
              <a href="/charge">
                <ListImg src="/images/icons/가계부.png"></ListImg>
              </a>
              <a href="/checklist">
                <ListImg src="/images/icons/체크리스트.png"></ListImg>
              </a>
            </div>
          </Row>
        </Container>

        <Items2 width="18rem" height="18rem" pickAreaName={pickAreaName} />
      </Container>
      <Footer />
    </>
  );
}

// style-components
const Title = styled.p`
  font: 2rem/1 'Inter';
  @media screen and (max-width: 1200px) {
    font: 2rem/1 'Inter';
  }
  @media screen and (max-width: 992px) {
    font: 1.5rem/1 'Inter';
  }
  @media screen and (max-width: 576px) {
    font: 1.1rem/1 'Inter';
  }
`;

const SubTitle = styled.p`
  font: 2rem/1 'Inter';
  @media screen and (max-width: 1200px) {
    font: 2rem/1 'Inter';
  }
  @media screen and (max-width: 992px) {
    font: 1.5rem/1 'Inter';
  }
  @media screen and (max-width: 576px) {
    display: none;
  }
`;

const ListImg = styled.img`
  width: calc(100 / 3);
  @media screen and (max-width: 1200px) {
    width: 30%;
  }
  @media screen and (max-width: 992px) {
    width: 30%;
  }
  @media screen and (max-width: 576px) {
    width: 40%;
  }
`;
