import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useTodoListStore = defineStore({
  id: 'todoListStore',
  state: () => ({
    todoList: useLocalStorage('todoList', []),
    todo: useLocalStorage('todo', {}),
    currentWeekTodoList: useLocalStorage('currentWeekTodoList', []),

    isCreateTodoListSuccessful: useLocalStorage(
      'isCreateTodoListSuccessful',
      false
    ),
    errorSavingTodoList: useLocalStorage('errorSavingTodoList', ''),

    isUpdateTodoItemSuccessful: useLocalStorage(
      'isUpdateTodoItemSuccessful',
      ''
    ),
    errorUpdatingTodoItem: useLocalStorage('errorUpdatingTodoItem', ''),
  }),
  getters: {
    getTodoList: state => state.todoList,
    getTodo: state => state.todo,
    getCurrentWeekTodoList: state => state.currentWeekTodoList,
    getIsCreateTodoListSuccessful: state => state.isCreateTodoListSuccessful,
    getErrorSavingTodoList: state => state.errorSavingTodoList,
    getIsUpdateTodoItemSuccessful: state => state.isUpdateTodoItemSuccessful,
    getErrorUpdatingTodoItem: state => state.errorUpdatingTodoItem,
  },
  actions: {
    setTodoList(value) {
      this.todoList = value;
    },
    setTodo(value) {
      this.todo = value;
    },
    setCurrentWeekTodoList(value) {
      this.currentWeekTodoList = value;
    },
    setIsCreateTodoListSuccessful(value) {
      this.isCreateTodoListSuccessful = value;
    },
    setErrorSavingTodoList(value) {
      this.errorSavingTodoList = value;
    },
    setIsUpdateTodoItemSuccessful(value) {
      this.isUpdateTodoItemSuccessful = value;
    },
    setErrorUpdatingTodoItem(value) {
      this.errorUpdatingTodoItem = value;
    },
    updateCurrentWeekToDoList() {
      console.log('Update current week to do list');
      this.currentWeekTodoList = this.currentWeekTodoList.map(
        obj => this.todoList.find(o => o.id === obj.id) || obj
      );
    },
  },
});
