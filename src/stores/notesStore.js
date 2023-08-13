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
const updateNoteMutation = gql`
  mutation updateNote($input: UpdateNote!) {
    updateNote(input: $input)
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
    noteSubcription {
      mutation
      data {
        id
        topic
        content
        createdAt
      }
    }
  }
`;
const deleteTodoListItemMutation = gql`
  mutation deleteTodoListItem($input: DeleteTodoListItem!) {
    deleteTodoListItem(input: $input)
  }
`;
const deleteNoteMutation = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    todoList: useLocalStorage('todoList', []),
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
    async updateNoteMutation(data) {
      console.log('We are updating fellas');
      try {
        const {
          mutate: updateNote,
          onError,
          onDone,
        } = useMutation(updateNoteMutation, () => {
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
        console.log('Withing catch');
        console.log(error);
      }
    },
    async deleteNoteMutation(note_id) {
      try {
        const {
          mutate: deleteNote,
          onError,
          onDone,
        } = useMutation(deleteNoteMutation, () => {
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
      const { onResult } = useQuery(getTodoList, { fetchPolicy: 'no-cache' });
      return onResult(({ data }) => {
        this.todoList = data.getTodaysToDoList?.todoListItems;
        console.log(this.todoList);
        this.todoListSubscription();
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

    // TODO: Star of the day https://v4.apollo.vuejs.org/guide-composable/subscription.html#subscribetomore
    async getNotes() {
      const { onResult, subscribeToMore } = useQuery(getNotes, {
        fetchPolicy: 'no-cache',
      });
      subscribeToMore(() => ({
        document: notesSubscription,

        // TODO: In this we shall have checks to check what type of mutation was done in order to update the data accordingly
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log('Within update Query');
          let noteSubData = subscriptionData.data.noteSubcription;
          let newNote = noteSubData.data;
          console.log(noteSubData);
          let newData = {
            getNotes: [],
          };
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
  },
});
