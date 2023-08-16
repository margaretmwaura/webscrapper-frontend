import gql from 'graphql-tag';
export const GET_TODO_LIST_QUERY = gql`
  query ($user_id: String!) {
    getTodaysToDoList(user_id: $user_id) {
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
export const GET_NOTES_QUERY = gql`
  query ($user_id: String!) {
    getNotes(user_id: $user_id) {
      id
      topic
      content
      createdAt
    }
  }
`;
