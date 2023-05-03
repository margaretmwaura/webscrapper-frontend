import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { provideApolloClient } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { apolloClient } from './../apolloClient';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';

provideApolloClient(apolloClient);

const createToDoListMutation = gql`
  mutation createToDoList($input: TodoListInput!) {
    createToDoList(input: $input)
  }
`;
// TODO: Check on how to properly reset store values
export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoList: useLocalStorage('todoList', {}),
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
  },
});
