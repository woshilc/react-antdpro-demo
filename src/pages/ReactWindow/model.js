import * as usersService from './service.js';
import { PAGE_SIZE } from './constants';

const getList = (i) => {
  const start = (i - 1) * PAGE_SIZE;
  const end = i * PAGE_SIZE;
  let list = [];
  for (let i = start; i < end; i++) {
    list.push({ id: i, name: `name${i}`, description: i });
  }
  return list;
};

export default {
  namespace: 'window',
  state: {
    list: [],
    page: null,
    record: {
      id: null,
      name: null,
      description: null,
    },
  },
  reducers: {
    save(state, { payload: { response: list, page } }) {
      return { ...state, list, page };
    },
    check(state, action) {
      const record = state.list.find((item) => item.id == action.payload.id);
      console.log(record);
      return {
        ...state,
        record: record,
      };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put, select }) {
      const newList = getList(page);
      const prevList = yield select((state) => state.window.list);
      const list = prevList.concat(newList);
      yield put({
        type: 'save',
        payload: {
          response: list,
          page: page,
        },
      });
      //const response = yield call(usersService.fetch, { page });
      // yield put({
      //     type: 'save',
      //     payload: {
      //         response,
      //         total: parseInt(25, 10),
      //         page: parseInt(page, 10),
      //     },
      // });
      // const { data, headers } = yield call(usersService.fetch, { page });
      // yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/react-window') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
