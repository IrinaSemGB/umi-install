import { Effect, Reducer } from 'umi';
import axios from 'axios';
import defaultReducers from '@/pages/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getAuthors: Effect;
    create: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const callGetAuthors = () =>
  axios({
    url: 'http://localhost:5000/author/search',
    method: 'POST',
  })
    .then((res: any) => res.data)
    .catch((err: any) => err);

const postCreate = (newAuthor: any) =>
  axios({
    url: `http://localhost:5000/author`,
    method: 'POST',
    data: newAuthor,
  })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => err);

const callCreateAuthor = (newAuthor: any) => postCreate(newAuthor);

const Model: IModel = {
  namespace: 'Author',
  state: {},
  effects: {
    *getAuthors(_, { call, put }) {
      const data = yield call(callGetAuthors);
      yield put({
        type: 'save',
        payload: { authorList: data },
      });
    },
    *create({ payload }, { call, put }) {
      const data = yield call(callCreateAuthor, payload.newAuthor);
      yield put({
        type: 'getAuthors',
        payload: { authorList: data },
      });
    },
  },
  reducers: {
    ...defaultReducers,
  },
};

export default Model;
