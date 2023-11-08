import { useMutation } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import { useNotesStore } from './../stores/notesStore';

import {
  CREATE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
} from '../graphql/mutations';

import { GET_NOTES_QUERY } from '../graphql/queries';
import { NOTE_SUBSCRIPTION } from '../graphql/subscriptions';

export function useNotesManagement() {
  const { mutate: createNoteMutation } = useMutation(CREATE_NOTE_MUTATION);
  const { mutate: updateNoteMutation } = useMutation(UPDATE_NOTE_MUTATION);
  const { mutate: deleteNoteMutation } = useMutation(DELETE_NOTE_MUTATION);

  const notesStore = useNotesStore();

  const createNote = async data => {
    let input_data = {
      input: data,
    };
    try {
      const { data } = await createNoteMutation({
        input: input_data,
      });
      notesStore.seIisCreateNoteSuccessful(true);
    } catch (error) {
      let err = '';
      if (error) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'There was an error when trying to create the note';
      }
      notesStore.seIisCreateNoteSuccessful(false);
      notesStore.setErrorCreatingNote(err);
    }
  };

  const updateNote = async data => {
    let input_data = {
      input: data,
    };
    try {
      const { data } = await updateNoteMutation({
        input: input_data,
      });
      notesStore.setIsUpdateNoteSuccessful(true);
    } catch (error) {
      let err = '';
      if (error) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'There was an error when trying to create the note';
      }
      notesStore.setIsUpdateNoteSuccessful(false);
      notesStore.setErrorUpdatingNote(err);
    }
  };

  const deleteNote = async note_id => {
    try {
      const { data } = await deleteNoteMutation({
        input: note_id,
      });
      notesStore.setIsDeleteNoteSuccessful(true);
    } catch (error) {
      let err = '';
      if (error) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'There was an error when trying to create the note';
      }
      notesStore.setIsDeleteNoteSuccessful(false);
      notesStore.setErrorDeletingNote(err);
    }
  };

  const getNotes = async () => {
    let user_id = await this.getCurrentUserId();
    if (typeof user_id == 'undefined' || user_id == '') {
      console.log('You need to authenticate first ');
      return;
    }
    const { onResult, subscribeToMore } = useQuery(
      GET_NOTES_QUERY,
      {
        user_id: user_id,
      },
      () => ({
        fetchPolicy: 'no-cache',
      })
    );
    subscribeToMore(() => ({
      document: NOTE_SUBSCRIPTION,
      variables: {
        user_id: user_id,
      },
      updateQuery: (previousResult, { subscriptionData }) => {
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
      notesStore.setNotes([]);
      let notes = [];
      for (let note of data.getNotes) {
        notes.push(note);
      }
      notesStore.setNotes(notes);
    });
  };

  const getCurrentUserId = () => {
    let user = authStore.getUser();
    let user_id = '';
    if (user && typeof user != 'undefined') {
      user_id = user.id;
    }
    return user_id;
  };

  return {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
  };
}
