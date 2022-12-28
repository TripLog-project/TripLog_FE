// 액션 타입(문자열)
const ADD_PLAN_DATE = 'triplog/ADD_PLAN_DATE';
const ADD_PLAN_ITEM = 'triplog/ADD_PLAN_ITEM';
const SET_DATE_IDX = 'triplog/SET_DATE_IDX';
const DELETE_PLAN_ITEM = 'triplog/DELETE_PLAN_ITEM';
const SET_AREA_CODE = 'triplog/SET_AREA_CODE';
const SET_REGION = 'triplog/SET_REGION';

export function addPlanDate(planDate) {
  return {
    type: ADD_PLAN_DATE,
    payload: planDate,
  };
}

export function addPlanItems(planItems) {
  return {
    type: ADD_PLAN_ITEM,
    payload: planItems,
  };
}

export function setDateIdx(idx) {
  return {
    type: SET_DATE_IDX,
    payload: idx,
  };
}

export function deletePlanItem(deleteItemObj) {
  return {
    type: DELETE_PLAN_ITEM,
    payload: deleteItemObj,
  };
}

export function setAreaCode(areaCode) {
  return {
    type: SET_AREA_CODE,
    payload: areaCode,
  };
}

export function setRegion(region) {
  return {
    type: SET_REGION,
    payload: region,
  };
}

// 초기 상태 설정
const initState = {
  planDate: {
    startDate: '',
    endDate: '',
    period: [],
  },
  // 상황에 맞게 2중 배열을 만들기 위해 변경
  planItems: [],
  planDateIdx: 0,
  list: [],
  areaCode: 0,
  region: 0,
};

// 리듀서
export default function triplog(state = initState, action) {
  switch (action.type) {
    case ADD_PLAN_DATE:
      return {
        ...state,
        planDate: action.payload,
      };
    case SET_AREA_CODE:
      return {
        ...state,
        areaCode: action.payload,
        planDate: {
          startDate: '',
          endDate: '',
          period: [],
        },
        planItems: [],
        planDateIdx: 0,
      };
    case SET_REGION:
      return {
        ...state,
        areaCode: action.payload,
        region: action.payload,
      };
    case ADD_PLAN_ITEM:
      // state 값에 바로 배열 처리를 하면 mutation 에러 발생
      // 해당 값을 받아줄 dummy 데이터 생성
      let dummyItem = {};
      dummyItem.planItems = [];

      // period 의 길이 만큼 배열이 생성 되면 되므로 for 문으로 배열 만들기
      // 이전 데이터는 그대로 있어야 하므로 기존 데이터의 값이 존재 하면 그대로 넣어주기
      for (let i = 0; i < state.planDate.period.length; i++) {
        if (state.planItems[i] !== undefined) {
          dummyItem.planItems.push(state.planItems[i]);
        } else {
          dummyItem.planItems.push([]);
        }
      }

      // 다시 장소 추가 버튼을 눌러서 새롭게 데이터가 들어오면 추가해주기
      // 단 기존에 기록 된 planItems 배열과 비교하여 중복되면 추가하지 않는다!
      // findIndex 메소드로 중복 값이 없을 경우(리턴이 -1) 배열에 추가해 준다
      // redux 내부에서 배열 함수를 쓰면 mutation 에러가 발생 하므로 전개 연산자를 사용하여 배열을 추가
      if (
        dummyItem.planItems[action.payload.idx].findIndex(
          (e) => e.title === action.payload.pickedPlace.title
        ) === -1
      ) {
        dummyItem.planItems[action.payload.idx] = [
          ...dummyItem.planItems[action.payload.idx],
          action.payload.pickedPlace,
        ];
      }
      return {
        ...state,
        planItems: dummyItem.planItems,
      };
    case SET_DATE_IDX:
      return {
        ...state,
        planDateIdx: action.payload,
      };
    // 삭제 로직 시작
    case DELETE_PLAN_ITEM:
      // 기존 데이터를 보존해야 하므로 다시 더미 배열 만들어서 기존 데이터 넣어주기
      let dummyItem2 = {};
      dummyItem2.planItems = [];
      // 데이터를 처음 추가할 때(ADD_PLAN_ITEM) 배열이 완성이 되므로 undefined 문제가 발생하지 않으므로
      // 바로 배열을 복사 해줌
      for (let i = 0; i < state.planDate.period.length; i++) {
        dummyItem2.planItems.push(state.planItems[i]);
      }

      // 수정이 필요한 날짜의 배열을 다시 더미 배열로 만들기
      const dummyArr = state.planItems[action.payload.idx];

      // 삭제가 완료된 배열을 넣기 위한 새로운 배열
      let newArr = [];
      // 디스패치로 날아온 제목과 다른 경우에만 배열을 추가 -> 제목이 같으면 추가가 안되므로 삭제와 동일하게 처리 됨
      // 배열 함수를 쓰면 또 mutation 에러가 떠서 for 문으로 처리
      for (let i = 0; i < dummyArr.length; i++) {
        if (dummyArr[i].title !== action.payload.title) {
          newArr.push(dummyArr[i]);
        }
      }

      // 해당 날짜의 배열에 삭제 처리 된 배열을 삽입
      dummyItem2.planItems[action.payload.idx] = newArr;
      return {
        ...state,
        // 전체 더미 데이터를 state 에 반영
        planItems: dummyItem2.planItems,
      };
    default:
      return state;
  }
}
