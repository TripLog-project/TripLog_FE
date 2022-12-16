import { Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlanItem } from '../../store/modules/triplog';

const PlanItem = ({ onClick, productItems, idx }) => {
  let state = useSelector((state) => state.triplog);
  let dispatch = useDispatch();

  const onErrorImg = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/images/submain/경주.png';
  };

  if (state.planItems.length > 0) {
    return state.planItems[idx].map(
      ({ id, firstimage, title, src, addr1, sigungucode }, i) => (
        <Stack
          className="d-flex shadow-sm p-3 rounded m-auto mb-2"
          direction="horizontal"
          gap={3}
          style={{
            height: '4.5rem',
            width: '290px',
            backgroundColor: 'rgba(200, 200, 200, .2)',
          }}
        >
          <img
            src={state.planItems[idx][i].Image}
            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }}
            onError={onErrorImg}
            alt=''
          ></img>

          <Stack className="col-9 d-flex flex-column my-auto">
            <Title className="m-1 fs-6">{title}</Title>
            <Title className="m-1" style={{ fontSize: '12px' }}>
              {addr1.slice(0, 12)}
            </Title>
          </Stack>

          <Stack>
            <button
              className="btn"
              onClick={() => {
                dispatch(deletePlanItem({ title, idx }));
              }}
            >
              X
            </button>
          </Stack>
        </Stack>
      )
    );
  }
};

export default PlanItem;

const Title = styled.p`
  font: 2rem/1 'Inter';
`;
