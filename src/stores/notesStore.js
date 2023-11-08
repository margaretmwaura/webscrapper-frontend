import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useNotesStore = defineStore({
  id: 'notesStore',
  state: () => ({
    notes: useLocalStorage('notes', []),
    isCreateNoteSuccessful: useLocalStorage('isCreateNoteSuccessful', false),
    errorCreatingNote: useLocalStorage('errorCreatingNote', ''),

    isUpdateNoteSuccessful: useLocalStorage('isUpdateNoteSuccessful', false),
    errorUpdatingNote: useLocalStorage('errorUpdatingNote', ''),

    isDeleteNoteSuccessful: useLocalStorage('isDeleteNoteSuccessful', false),
    errorDeletingNote: useLocalStorage('errorDeletingNote', ''),
  }),
  getters: {
    getNotes: state => state.notes,
    getIsCreateNoteSuccessful: state => state.isCreateNoteSuccessful,
    getErrorCreatingNote: state => state.errorCreatingNote,
    getIsUpdateNoteSuccessful: state => state.isUpdateNoteSuccessful,
    getErrorUpdatingNote: state => state.errorUpdatingNote,
    getIsDeleteNoteSuccessful: state => state.isDeleteNoteSuccessful,
    getErrorDeletingNote: state => state.errorDeletingNote,
  },
  actions: {
    setNotes(value) {
      this.notes = value;
    },
    seIisCreateNoteSuccessful(value) {
      this.isCreateNoteSuccessful = value;
    },
    setErrorCreatingNote(value) {
      this.errorCreatingNote = value;
    },
    setIsUpdateNoteSuccessful(value) {
      this.isUpdateNoteSuccessful = value;
    },
    setErrorUpdatingNote(value) {
      this.errorUpdatingNote = value;
    },
    setIsDeleteNoteSuccessful(value) {
      this.isDeleteNoteSuccessful = value;
    },
    setErrorDeletingNote(value) {
      this.errorDeletingNote = value;
    },
  },
});
