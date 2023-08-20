import gql from 'graphql-tag';
export const TODO_LIST_SUBSCRIPTION = gql`
  subscription ($user_id: String!) {
    todoCreated(user_id: $user_id) {
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
export const NOTE_SUBSCRIPTION = gql`
  subscription ($user_id: String!) {
    noteSubcription(user_id: $user_id) {
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
