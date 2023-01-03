import { Container, Row, Col, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PlanKakao from '../../components/share/PlanKakao';

// detail 페이지의 submenu 부분
export default function Welcome() {
  let state = useSelector((state) => state.triplog);
  let users = useSelector((state) => state.users);

  if (users.isLogin) {
    return (
      <Container className="p-3 col-9">
        <Row className="d-block justify-content-start">
          <Col className="my-3">
            <Title className="justify-content-start fw-bold fs-3">
              <p className="mt-3 fs-6 d-block">
                여행에 필요한 모든 것, TripLog
              </p>
              <p
                className="mb-3"
                style={{ color: '#036635', display: 'inline-block' }}
              >
                {users.userNickName}
              </p>
              의 여행계획 세우기 ✏️
            </Title>
            <div className="fs-6 d-inline p-2"> 📆 여행 기간 : </div>
            <div className="fs-6 d-block p-2">
              {state.planDate.startDate + ' ~ ' + state.planDate.endDate}{' '}
            </div>
          </Col>
          <Col className="d-flex justify-content-start m-3 mb-0">
            <PlanLi>
              <a href="/Plan/:areaCode">
                <PlanKakao />
              </a>
            </PlanLi>
            <PlanLi>
              <a href="/list/1">
                <Badge bg="success" text="light" className="fs-9">
                  #구경하러가기👀
                </Badge>{' '}
              </a>
            </PlanLi>

            <PlanLi>
              <a href="/checkList">
                <Badge bg="dark" text="light" className="fs-9">
                  #나의 체크리스트🔖
                </Badge>{' '}
              </a>
            </PlanLi>
            <PlanLi>
              <a href="/charge">
                <Badge bg="dark" text="light" className="fs-9">
                  #가계부 작성하러가기💸
                </Badge>{' '}
              </a>
            </PlanLi>
          </Col>
        </Row>
      </Container>
    );
  }
}

// style-components
const Title = styled.div`
  font: 2rem/1 'Inter';
`;

const PlanLi = styled.li`
  list-style: none;
  display: inline-block;
  margin-right: 0.5rem;

  a {
    color: #333;
    text-decoration: none;
  }
`;
