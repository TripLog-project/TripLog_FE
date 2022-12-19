import {
  Container,
  Tab,
} from 'react-bootstrap';
import CheckListRe from '../CheckList/CheckList_re';

export default function MyCheckList() {
  return (
    <>
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
    </>
  );
}
