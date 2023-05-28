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
    async getTheToDoList() {
      const { onResult } = useQuery(
        gql`
          query {
            getTodaysToDoList {
              id
              todoListItems {
                id
                itemName
                statusName
              }
            }
          }
        `,
        { fetchPolicy: 'no-cache' }
      );
      return onResult(({ data }) => {
        console.log(data);
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
                itemName
                statusName
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
