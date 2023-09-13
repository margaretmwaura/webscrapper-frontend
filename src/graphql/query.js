import gql from 'graphql-tag';
// TODO: Practices now
// https://www.apollographql.com/docs/react/data/operation-best-practices/
export const GET_TODAY_TODO_LIST_QUERY = gql`
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

export const GET_CURRENT_WEEK_TODO_LIST_QUERY = gql`
  query ($user_id: String!) {
    getThisWeeksToDoList(user_id: $user_id) {
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
