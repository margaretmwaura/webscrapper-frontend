import { defineStore } from 'pinia';
import { provideApolloClient } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { apolloClient } from './../apolloClient';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

provideApolloClient(apolloClient);

const createToDoListMutation = gql`
  mutation createToDoList($input: TodoListInput!) {
    createToDoList(input: $input)
  }
`;
export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoLists: useLocalStorage('todoLists', []),
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
      onError(error => {});
      onDone(result => {});
      await createToDo();
    },
    async getTheToDoList() {
      const { onResult, result } = useQuery(
        gql`
          query {
            getTodoList {
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
        this.todoLists = data.getTodoList;
      });
    },
  },
});
