import gql from 'graphql-tag';
export const CREATE_TODO_LIST_MUTATION = gql`
  mutation createToDoList($input: TodoListInput!) {
    createToDoList(input: $input)
  }
`;
export const UPDATE_TODO_LIST_ITEM_MUTATION = gql`
  mutation updateTodoListItem($input: UpdateTodoListItem!) {
    updateTodoListItem(input: $input)
  }
`;
export const ADD_TODO_LIST_ITEM_MUTATION = gql`
  mutation addTodoListItem($input: AddTodoListItem!) {
    addTodoListItem(input: $input)
  }
`;
export const DELETE_TODO_LIST_ITEM_MUTATION = gql`
  mutation deleteTodoListItem($input: DeleteTodoListItem!) {
    deleteTodoListItem(input: $input)
  }
`;
export const CREATE_NOTE_MUTATION = gql`
  mutation createNote($input: CreateNote!) {
    createNote(input: $input)
  }
`;
export const UPDATE_NOTE_MUTATION = gql`
  mutation updateNote($input: UpdateNote!) {
    updateNote(input: $input)
  }
`;
export const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($input: RegisterUser!) {
    registerUser(input: $input) {
      ... on CreateError {
        message
      }
      ... on RegisterSuccessful {
        user {
          id
          first_name
          email
        }
      }
    }
  }
`;
