import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/counter', component: '@/pages/CounterList' },
    { path: '/todo', component: '@/pages/TodoApp/TodoList' },
    { path: '/book', component: '@/pages/Book/BookList' },
  ],
  fastRefresh: {},
});
