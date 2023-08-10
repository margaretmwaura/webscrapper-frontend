import { defineStore } from 'pinia';
import { provideApolloClient } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { apolloClient } from './../apolloClient';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useSubscription } from '@vue/apollo-composable';

provideApolloClient(apolloClient);

const createToDoListMutation = gql`
  mutation createToDoList($input: TodoListInput!) {
    createToDoList(input: $input)
  }
`;
const updateTodoListItemMutation = gql`
  mutation updateTodoListItem($input: UpdateTodoListItem!) {
    updateTodoListItem(input: $input)
  }
`;
const addTodoListItemMutation = gql`
  mutation addTodoListItem($input: AddTodoListItem!) {
    addTodoListItem(input: $input)
  }
`;
const createNoteMutation = gql`
  mutation createNote($input: CreateNote!) {
    createNote(input: $input)
  }
`;
const getTodoList = gql`
  query {
    getTodaysToDoList {
      id
      todoListItems {
        id
        item_name
        status_name
        reminder
        key_name
      }
    }
  }
`;
const getNotes = gql`
  query {
    getNotes {
      id
      topic
      content
      createdAt
    }
  }
`;
const todoListSubscription = gql`
  subscription {
    todoCreated {
      id
      todoListItems {
        id
        item_name
        status_name
        reminder
      }
    }
  }
`;
const notesSubscription = gql`
  subscription {
    noteAdded {
      id
      topic
      content
      createdAt
    }
  }
`;
const deleteTodoListItemMutation = gql`
  mutation deleteTodoListItem($input: DeleteTodoListItem!) {
    deleteTodoListItem(input: $input)
  }
`;
export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoList: useLocalStorage('todoList', []),
    notes: useLocalStorage('notes', ''),
    isCreateTodoListSuccessful: useLocalStorage(
      'isCreateTodoListSuccessful',
      false
    ),
    errorSavingTodoList: useLocalStorage('errorSavingTodoList', ''),
    isCreateNoteSuccessful: useLocalStorage('isCreateNoteSuccessful', false),
    errorCreatingNote: useLocalStorage('errorCreatingNote', ''),
  }),
  getters: {},
  actions: {
    async createToDoList(data) {
      const {
        mutate: createToDo,
        onError,
        onDone,
      } = useMutation(createToDoListMutation, () => {
        return {
          variables: {
            input: {
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
      } = useMutation(updateTodoListItemMutation, () => {
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
      data.id = this.todoList[0].id;
      const {
        mutate: addTodoItem,
        onError,
        onDone,
      } = useMutation(addTodoListItemMutation, () => {
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
    async getTheToDoList() {
      const { onResult } = useQuery(getTodoList, { fetchPolicy: 'no-cache' });
      return onResult(({ data }) => {
        this.todoList = data.getTodaysToDoList?.todoListItems;
        console.log(this.todoList);
        this.todoListSubscription();
      });
    },
    async getNotes() {
      const { onResult } = useQuery(getNotes, { fetchPolicy: 'no-cache' });
      return onResult(({ data }) => {
        this.notes = data.getNotes;
        console.log('Notes');
        console.log(data);
        this.notesSubscription();
      });
    },
    async todoListSubscription() {
      const { onResult } = useSubscription(todoListSubscription, null, () => ({
        fetchPolicy: 'no-cache',
      }));

      onResult(result => {
        console.log('We are in susbscription');
        console.log(result.data.todoCreated.todoListItems);
        this.todoList = result.data?.todoCreated?.todoListItems;
      });
    },

    // https://stackoverflow.com/questions/5915789/how-to-replace-item-in-array
    // https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/
    async notesSubscription() {
      const { onResult } = useSubscription(notesSubscription, null, () => ({
        fetchPolicy: 'no-cache',
      }));

      onResult(result => {
        console.log('We are in notes susbscription');
        console.log(result.data.noteAdded);
        this.notes = result.data?.noteAdded;
      });
    },
    async deleteTodoItem(data) {
      const {
        mutate: deleteItem,
        onError,
        onDone,
      } = useMutation(deleteTodoListItemMutation, () => {
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
      } = useMutation(createNoteMutation, () => {
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
  },
});
