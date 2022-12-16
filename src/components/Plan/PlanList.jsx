import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import KakaoMap from '../../pages/Plan/KakaoMap';
import PlanItem from './PlanItem';
import { useDispatch, useSelector } from 'react-redux';
import { setDateIdx } from '../../store/modules/triplog';

const PlanList = ({ productItems, planItems, setPlanItems, onClick }) => {
  let state = useSelector((state) => state.triplog);
  const users = useSelector((state) => state.users);
  let dispatch = useDispatch();

  if (users.isLogin) {
    return state.planDate.period.map(
      ({ id, firstimage, title, src, addr1, sigungucode }, idx) => (
        <Container
          sm={1}
          md={1}
          lg={2}
          xl={2}
          className="overflow-scroll"
          style={{ height: '20%', width: '350px' }}
          key={idx}
        >
          <PlanCard className="col-md-12 mt-4">
            {/* 각기 다른 id를 가져와야하기 때문에 idx props로 전달 */}
            <KakaoMap
              className="col-6 m-auto"
              idx={idx}
              areaCode={state.areaCode}
            />
            <Row className="d-flex justify-content-center ">
              <Col md={12} className="d-flex m-3 ">
                <p className="fw-6 fw-bold ms-2 ">
                  day
                  <span className="text-success"> {idx + 1}</span>
                </p>
              </Col>
            </Row>
            <PlanBox
              className="m-3 m-auto overflow-scroll"
              style={{ height: '270px' }}
            >
              <PlanItem
                productItems={productItems}
                setPlanItems={setPlanItems}
                planItems={planItems}
                idx={idx}
              />
            </PlanBox>

            <Col className="m-auto d-flex mt-2 mb-2 col-10">
              <Button
                onClick={() => {
                  onClick();
                  dispatch(setDateIdx(idx));
                }}
                className="btn btn-dark mx-1"
                style={{ width: '100%' }}
              >
                장소 추가
              </Button>
            </Col>
          </PlanCard>
        </Container>
      )
    );
  }
};

export default PlanList;

const PlanBox = styled.div``;

const PlanCard = styled.div`
  border: 0.5px solid #c9c9c9;
  border-radius: 5px;
  box-shadow: 2px 3px 2px 2px rgba(200, 200, 200, 0.1);
  padding: 17px;
  background-color: #fff;
`;
