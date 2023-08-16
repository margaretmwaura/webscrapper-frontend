import { defineStore } from 'pinia';
import { provideApolloClient } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { apolloClient } from './../apolloClient';
import { useQuery } from '@vue/apollo-composable';
import { computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useSubscription } from '@vue/apollo-composable';
import { useAuthStore } from './authStore';
import {
  CREATE_TODO_LIST_MUTATION,
  UPDATE_TODO_LIST_ITEM_MUTATION,
  ADD_TODO_LIST_ITEM_MUTATION,
  DELETE_TODO_LIST_ITEM_MUTATION,
  CREATE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
} from './../graphql/mutation';

import { GET_TODO_LIST_QUERY, GET_NOTES_QUERY } from './../graphql/query';
import {
  TODO_LIST_SUBSCRIPTION,
  NOTE_SUBSCRIPTION,
} from './../graphql/subscriptions';

provideApolloClient(apolloClient);

export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoList: useLocalStorage('todoList', []),
    todo: useLocalStorage('todo', {}),
    notes: useLocalStorage('notes', []),
    isCreateTodoListSuccessful: useLocalStorage(
      'isCreateTodoListSuccessful',
      false
    ),
    errorSavingTodoList: useLocalStorage('errorSavingTodoList', ''),

    isCreateNoteSuccessful: useLocalStorage('isCreateNoteSuccessful', false),
    errorCreatingNote: useLocalStorage('errorCreatingNote', ''),

    isUpdateNoteSuccessful: useLocalStorage('isUpdateNoteSuccessful', false),
    errorUpdatingNote: useLocalStorage('errorUpdatingNote', ''),

    isDeleteNoteSuccessful: useLocalStorage('isDeleteNoteSuccessful', false),
    errorDeletingNote: useLocalStorage('errorDeletingNote', ''),
  }),
  getters: {},
  actions: {
    async createToDoList(data) {
      let user_id = await this.getCurrentUserId();
      if (typeof user_id == 'undefined' || user_id == '') {
        this.errorSavingTodoList =
          'You need to authenticate first, you are not authenticated';
        this.isCreateTodoListSuccessful = false;
        return;
      }
      const {
        mutate: createToDo,
        onError,
        onDone,
      } = useMutation(CREATE_TODO_LIST_MUTATION, () => {
        return {
          variables: {
            input: {
              user_id: user_id,
              todoListItems: data,
            },
          },
        };
      });
      onError(error => {
        this.errorSavingTodoList = error.message;
        this.isCreateTodoListSuccessful = false;
      });
      onDone(result => {
        this.isCreateTodoListSuccessful = true;
      });
      await createToDo();
    },
    async updateToDoListItem(data) {
      const {
        mutate: updateTodoListItem,
        onError,
        onDone,
      } = useMutation(UPDATE_TODO_LIST_ITEM_MUTATION, () => {
        return {
          variables: {
            input: data,
          },
        };
      });
      onError(error => {
        if (error) {
          console.log(
            error.networkError
              ? error.networkError.result.errors[0].message
              : error.graphQLErrors[0].message
          );
        } else {
          console.log('No error gotten');
        }
      });
      onDone(result => {
        console.log(result);
      });
      await updateTodoListItem();
    },
    async addToDoListItem(data) {
      data.id = this.todo.id;
      const {
        mutate: addTodoItem,
        onError,
        onDone,
      } = useMutation(ADD_TODO_LIST_ITEM_MUTATION, () => {
        return {
          variables: {
            input: data,
          },
        };
      });
      onError(error => {
        if (error) {
          console.log(
            error.networkError
              ? error.networkError.result.errors[0].message
              : error.graphQLErrors[0].message
          );
        } else {
          console.log('No error gotten');
        }
      });
      onDone(result => {
        console.log(result);
      });
      await addTodoItem();
    },
    async deleteTodoItem(data) {
      const {
        mutate: deleteItem,
        onError,
        onDone,
      } = useMutation(DELETE_TODO_LIST_ITEM_MUTATION, () => {
        return {
          variables: {
            input: data,
          },
        };
      });
      onError(error => {
        if (error) {
          console.log(
            error.networkError
              ? error.networkError.result.errors[0].message
              : error.graphQLErrors[0].message
          );
        } else {
          console.log('No error gotten');
        }
      });
      onDone(result => {
        console.log(result);
      });
      await deleteItem();
    },
    async createNoteMutation(data) {
      const {
        mutate: createNote,
        onError,
        onDone,
      } = useMutation(CREATE_NOTE_MUTATION, () => {
        return {
          variables: {
            input: data,
          },
        };
      });
      onError(error => {
        this.errorCreatingNote = error.message;
        this.isCreateNoteSuccessful = false;
      });
      onDone(result => {
        this.isCreateNoteSuccessful = true;
      });
      await createNote();
    },
    async updateNoteMutation(data) {
      try {
        const {
          mutate: updateNote,
          onError,
          onDone,
        } = useMutation(UPDATE_NOTE_MUTATION, () => {
          return {
            variables: {
              input: data,
            },
          };
        });
        onError(error => {
          console.log(error.message);
          this.errorUpdatingNote = error.message;
          this.isUpdateNoteSuccessful = false;
        });
        onDone(result => {
          this.isUpdateNoteSuccessful = true;
        });
        await updateNote();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNoteMutation(note_id) {
      try {
        const {
          mutate: deleteNote,
          onError,
          onDone,
        } = useMutation(DELETE_NOTE_MUTATION, () => {
          return {
            variables: {
              id: note_id,
            },
          };
        });
        onError(error => {
          console.log(error.message);
          this.isDeleteNoteSuccessful = error.message;
          this.isDeleteNoteSuccessful = false;
        });
        onDone(result => {
          this.isDeleteNoteSuccessful = true;
        });
        await deleteNote();
      } catch (error) {
        console.log('Withing catch');
        console.log(error);
      }
    },
    async getTheToDoList() {
      let user_id = await this.getCurrentUserId();
      if (typeof user_id == 'undefined' || user_id == '') {
        console.log('You need to authenticate first ');
        return;
      }
      const { onResult } = useQuery(GET_TODO_LIST_QUERY, {
        user_id: user_id,
      });
      return onResult(({ data }) => {
        this.todo = data.getTodaysToDoList;
        this.todoList = data.getTodaysToDoList?.todoListItems;
        this.todoListSubscription();
      });
    },
    async todoListSubscription() {
      let user_id = await this.getCurrentUserId();
      if (typeof user_id == 'undefined' || user_id == '') {
        console.log('You need to authenticate first ');
        return;
      }
      const { onResult } = useSubscription(
        TODO_LIST_SUBSCRIPTION,
        { user_id: user_id },
        () => ({
          fetchPolicy: 'no-cache',
        })
      );

      onResult(result => {
        this.todo = result.data.todoCreated;
        this.todoList = result.data?.todoCreated?.todoListItems;
      });
    },
    // https://stackoverflow.com/questions/5915789/how-to-replace-item-in-array
    // https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/

    // TODO: Star of the day https://v4.apollo.vuejs.org/guide-composable/subscription.html#subscribetomore
    async getNotes() {
      let user_id = await this.getCurrentUserId();
      if (typeof user_id == 'undefined' || user_id == '') {
        console.log('You need to authenticate first ');
        return;
      }
      const { onResult, subscribeToMore } = useQuery(GET_NOTES_QUERY, {
        user_id: user_id,
      });
      subscribeToMore(() => ({
        document: NOTE_SUBSCRIPTION,
        variables: {
          user_id: user_id,
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log('We are subscrining');
          let noteSubData = subscriptionData.data.noteSubcription;
          let newData = {
            getNotes: [],
          };
          let newNote = noteSubData.data;
          if (noteSubData.mutation == 'Create') {
            let previousData = previousResult.getNotes;
            newData.getNotes = [...previousData, newNote];
          }
          if (noteSubData.mutation == 'Edit') {
            let previousData = previousResult.getNotes;
            previousData = previousData.map(note =>
              note.id == newNote.id ? newNote : note
            );
            newData.getNotes = previousData;
          }
          if (noteSubData.mutation == 'Delete') {
            let previousData = previousResult.getNotes;
            previousData = previousData.map(note => note.id !== newNote.id);
            newData.getNotes = previousData;
          }
          return newData;
        },
      }));
      return onResult(({ data }) => {
        console.log(data.getNotes);
        this.notes = [];
        for (let note of data.getNotes) {
          this.notes.push(note);
        }
        // this.notes = data.getNotes;
        console.log('Notes');
        console.log(this.notes);
      });
    },
    async getCurrentUserId() {
      const authStore = useAuthStore();
      let user_id = authStore.user?.id;
      return user_id;
    },
  },
});
