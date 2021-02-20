import { Effect, Reducer } from 'umi';

interface ICount {
  id: number;
  count: number;
}

export interface IState {
  counters: ICount[]
}

export interface IModel {
    namespace: string;
    state: IState;
    effects: {
      math: Effect;
      delete: Effect;
      move: Effect;
      update: Effect;
      add: Effect;
    };
    reducers: {
      mathAction: Reducer<IState>;
      deleteAction: Reducer<IState>;
      moveAction: Reducer<IState>;
      updateAction: Reducer<IState>;
      addAction: Reducer<IState>;
      save: Reducer<IState>;
      set: Reducer<IState>;
    };
}

const initialState = {
  counters: [
    {id: Math.random(), count: 10},
    {id: Math.random(), count: 20},
    {id: Math.random(), count: 30},
    {id: Math.random(), count: 40},
  ]
};

const Model: IModel = {
  namespace: 'Count',
  state: {
    counters: initialState.counters,
  },
  effects: {
    *math(_, { put }) {
      yield put({
        type: 'mathAction',
      });
    },
    *delete(_, { put }) {
      yield put({
        type: 'deleteAction',
      });
    },
    *move(_, { put }) {
      yield put({
        type: 'moveAction',
      });
    },
    *update(_, { put }) {
      yield put({
        type: 'updateAction',
      });
    },
    *add(_, { put }) {
      yield put({
        type: 'addAction',
      });
    },
  },
  reducers: {
    mathAction(state: any, { payload }: any) {
      const updatedCounters = state.counters.map((el: any) =>
        el.id === payload.id ? {...el, count: el.count + payload.value} : el);
      return {...state, counters: updatedCounters};
    },

    deleteAction(state: any, { payload }: any) {
      const newCounters = state.counters.filter((el: any) => el.id !== payload.id);
      return {...state, counters: newCounters};
    },

    moveAction(state: any, { payload }: any) {
      const currentElement = state.counters[payload.index];
      state.counters[payload.index] = state.counters[payload.index + payload.direction];
      state.counters[payload.index + payload.direction] = currentElement;
      return {...state, counters: state.counters.map((el: any) => el)};
    },

    updateAction(state: any, { payload }: any) {
      const newCountersUpdated = state.counters.map((el: any) =>
        el.id === payload.id ? {...el, count: payload.newValue} : el);
      return {...state, counters: newCountersUpdated};
    },

    addAction(state: any, { payload }: any) {
      const newCounter = {id: payload.id, count: payload.count};
      state.counters.unshift(newCounter);
      return {...state, counters: state.counters.map((el: any) => el)};
    },

    save(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },

    set(state: any, { payload }: any) {
      return payload;
    },
  },
};

export default Model;
