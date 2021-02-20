import { Effect, Reducer } from 'umi';
import faker from "faker";

const statuses = ["Todo", "Progress", "Review", "Done"];
const priorities = [1, 2, 3];

export interface ITask {
  id: number,
  name: string,
  description: string,
  status: string,
  priority: number
}

const initialState = {
  tasks: [
    {
      id: Math.random(),
      name: faker.random.words(5),
      description: faker.random.words(10),
      status: statuses[0],
      priority: priorities[0]
    },
    {
      id: Math.random(),
      name: faker.random.words(5),
      description: faker.random.words(10),
      status: statuses[1],
      priority: priorities[0]
    },
    {
      id: Math.random(),
      name: faker.random.words(5),
      description: faker.random.words(10),
      status: statuses[2],
      priority: priorities[0]
    },
    {
      id: Math.random(),
      name: faker.random.words(5),
      description: faker.random.words(10),
      status: statuses[3],
      priority: priorities[0]
    },
  ],

  statuses: ["Todo", "Progress", "Review", "Done"],
  priorities: [1, 2, 3],
}

export interface IState {
  tasks: ITask[],
  statuses: string[],
  priorities: number[],
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    left: Effect;
    right: Effect;
    priorityDown: Effect;
    priorityUp: Effect;
    update: Effect;
    delete: Effect;
    create: Effect;
  };
  reducers: {
    leftAction: Reducer<IState>;
    rightAction: Reducer<IState>;
    priorityDownAction: Reducer<IState>;
    priorityUpAction: Reducer<IState>;
    updateAction: Reducer<IState>;
    deleteAction: Reducer<IState>;
    createAction: Reducer<IState>;
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Todo',
  state: {
    tasks: initialState.tasks,
    statuses: initialState.statuses,
    priorities: initialState.priorities,
  },
  effects: {
    *left(_, { put }) {
      yield put({
        type: 'leftAction',
      });
    },
    *right(_, { put }) {
      yield put({
        type: 'rightAction',
      });
    },
    *priorityDown(_, { put }) {
      yield put({
        type: 'priorityDownAction',
      });
    },
    *priorityUp(_, { put }) {
      yield put({
        type: 'priorityUpAction',
      });
    },
    *update(_, { put }) {
      yield put({
        type: 'updateAction',
      });
    },
    *delete(_, { put }) {
      yield put({
        type: 'deleteAction',
      });
    },
    *create(_, { put }) {
      yield put({
        type: 'deleteAction',
      });
    },
  },
  reducers: {
    leftAction(state: any, { payload }: any) {
      function  previousStatus(currentStatus: string) {
        return statuses[statuses.indexOf(currentStatus) - 1];
      }
      const leftUpdatedTasks = state.tasks.map((el: any) => el.id === payload.id ? {...el, status: previousStatus(el.status)} : el);
      return {...state, tasks: leftUpdatedTasks};
    },

    rightAction(state: any, { payload }: any) {
      function  previousStatus(currentStatus: string) {
        return statuses[statuses.indexOf(currentStatus) + 1];
      }
      const leftUpdatedTasks = state.tasks.map((el: any) => el.id === payload.id ? {...el, status: previousStatus(el.status)} : el);
      return {...state, tasks: leftUpdatedTasks};
    },

    priorityDownAction(state: any, { payload }: any) {
      function  previousPriority(currentPriority: number) {
        return priorities[priorities.indexOf(currentPriority) - 1];
      }
      const limitMin = Math.min(...priorities);
      const priorityDownUpdatedTasks = state.tasks.map((el: any) =>
        (el.id === payload.id && payload.currentPriority > limitMin
          ? {...el, priority: previousPriority(el.priority)}
          : el));
      return {...state, tasks: priorityDownUpdatedTasks};
    },

    priorityUpAction(state: any, { payload }: any) {
      function  nextPriority(currentPriority: number) {
        return priorities[priorities.indexOf(currentPriority) + 1];
      }
      const limitMax = Math.max(...priorities);
      const priorityUpUpdatedTasks = state.tasks.map((el: any) => {
        if (el.id === payload.id && payload.currentPriority < limitMax) {
          return {...el, priority: nextPriority(el.priority)};
        } else {
          return el;
        }
      });
      return {...state, tasks: priorityUpUpdatedTasks};
    },

    updateAction(state: any, { payload }: any) {
      const updatedTask = payload.updatedTask;
      const updatedTasks = state.tasks.map((el: any) => {
        if (el.id === updatedTask.id) return {...el, name: updatedTask.name,
          description: updatedTask.description,
          status: updatedTask.status,
          priority: updatedTask.priority};
        return el;
      });
      return {...state, tasks: updatedTasks};
    },

    deleteAction(state: any, { payload }: any) {
      const deletedTasks = state.tasks.filter((el: any) => el.id !== payload.id);
      return {...state, tasks: deletedTasks};
    },

    createAction(state: any, { payload }: any) {
      const createdNewTask = [...state.tasks, payload.newTask];
      return {...state, tasks: createdNewTask};
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
