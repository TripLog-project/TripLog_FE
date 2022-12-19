import {
  Container,
  Tab,
} from 'react-bootstrap';
import BudgetRe from '../Budget/Budget_re';

export default function MyBudget() {
  return (
    <>
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
        {data.length === 0 ? <p>작성한 가계부가 없습니다</p> : <BudgetRe />}
      </Tab.Pane>
    </>
  );
}
