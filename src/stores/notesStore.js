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
  mutation addTodoListItem($input: addTodoListItem!) {
    addTodoListItem(input: $input)
  }
`;
export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoList: useLocalStorage('todoList', []),
    isCreateTodoListSuccessful: useLocalStorage(
      'isCreateTodoListSuccessful',
      false
    ),
    errorSavingTodoList: useLocalStorage('errorSavingTodoList', ''),
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
      data.id = todoList[0].id;
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
      const { onResult } = useQuery(
        gql`
          query {
            getTodaysToDoList {
              id
              todoListItems {
                id
                item_name
                status_name
                reminder
              }
            }
          }
        `,
        { fetchPolicy: 'no-cache' }
      );
      return onResult(({ data }) => {
        this.todoList = data.getTodaysToDoList?.todoListItems;
        console.log(this.todoList);
        this.todoListSubscription();
      });
    },
    async todoListSubscription() {
      const { onResult } = useSubscription(
        gql`
          subscription Subscription {
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
        `,
        null,
        () => ({
          fetchPolicy: 'no-cache',
        })
      );

      onResult(result => {
        console.log('We are in susbscription');
        console.log(result.data.todoCreated.todoListItems);
        this.todoList = result.data?.todoCreated?.todoListItems;
      });
    },
  },
});
