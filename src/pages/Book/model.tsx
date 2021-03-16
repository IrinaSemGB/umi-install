import { Effect, Reducer } from 'umi';
import axios from 'axios';
import defaultReducers from '@/pages/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getBooks: Effect;
    deleteBook: Effect;
    create: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const post = (url: string) =>
  axios({
    url: `http://localhost:5000/${url}`,
    method: 'POST',
  })
    .then((res) => res.data)
    .catch((err) => err);

const deleted = (id: string) =>
  axios({
    url: `http://localhost:5000/book/${id}`,
    method: 'DELETE',
  })
    .then((res) => res.data)
    .catch((err) => err);

const postCreate = (newBook: any) =>
  axios({
    url: `http://localhost:5000/book`,
    method: 'POST',
    data: newBook,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);

const callGetBooks = () => post('book/search');
const callDeleteBook = (id: string) => deleted(id);
const callCreateBook = (newBook: any) => postCreate(newBook);

const Model: IModel = {
  namespace: 'Book',
  state: {},
  effects: {
    *getBooks(_, { call, put }) {
      const data = yield call(callGetBooks);
      yield put({
        type: 'save',
        payload: { bookList: data },
      });
    },
    *deleteBook({ payload }, { call, put }) {
      const data = yield call(callDeleteBook, payload._id);
      yield put({
        type: 'getBooks',
        payload: { bookList: data },
      });
    },
    *create({ payload }, { call, put }) {
      const data = yield call(callCreateBook, payload.newBook);
      yield put({
        type: 'getBooks',
        payload: { bookList: data },
      });
    },
  },
  reducers: {
    ...defaultReducers,
  },
};

export default Model;
