import { useMutation } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import { useAuthStore } from './authStore';
import { useTodoListStore } from '../stores/todoListStore';

import {
  CREATE_TODO_LIST_MUTATION,
  UPDATE_TODO_LIST_ITEM_MUTATION,
  ADD_TODO_LIST_ITEM_MUTATION,
  DELETE_TODO_LIST_ITEM_MUTATION,
} from '../graphql/mutations';

import {
  GET_CURRENT_WEEK_TODO_LIST_QUERY,
  GET_TODAY_TODO_LIST_QUERY,
} from '../graphql/queries';
import { TODO_LIST_SUBSCRIPTION } from '../graphql/subscriptions';

export function useTodoListManagement() {
  const authStore = useAuthStore();
  const todoListStore = useTodoListStore();
  const { mutate: createTodoListMutation } = useMutation(
    CREATE_TODO_LIST_MUTATION
  );
  const { mutate: updateTodoListItemMutation } = useMutation(
    UPDATE_TODO_LIST_ITEM_MUTATION
  );
  const { mutate: addTodoListItemMutation } = useMutation(
    ADD_TODO_LIST_ITEM_MUTATION
  );
  const { mutate: deleteTodoListItemMutation } = useMutation(
    DELETE_TODO_LIST_ITEM_MUTATION
  );

  const createToDoList = async data => {
    let user_id = await this.getCurrentUserId();
    if (typeof user_id == 'undefined' || user_id == '') {
      todoListStore.setErrorSavingTodoList(
        'You need to authenticate first, you are not authenticated'
      );
      todoListStore.setIsCreateTodoListSuccessful(false);
      return;
    }
    let input_data = {
      user_id: user_id,
      todoListItems: data,
    };
    try {
      const { data } = await createTodoListMutation({
        input: input_data,
      });
      // FIXME: How do we check if the mutation was successful
      todoListStore.setIsCreateTodoListSuccessful(true);
    } catch (error) {
      todoListStore.setErrorSavingTodoList(error.message);
      todoListStore.setIsCreateTodoListSuccessful(false);
    }
  };

  const updateToDoListItem = async data => {
    let input_data = {
      input: data,
    };
    try {
      const { data } = await updateTodoListItemMutation({
        input: input_data,
      });
      // FIXME: How do we check if the mutation was successful
      todoListStore.setIsUpdateTodoItemSuccessful(true);
    } catch (error) {
      let error_message = '';
      if (error) {
        error_message = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        error_message =
          'There was an error when trying to update todo list item';
      }
      todoListStore.setErrorUpdatingTodoItem(error_message);
      todoListStore.setIsUpdateTodoItemSuccessful(false);
    }
  };

  const addToDoListItem = async data => {
    data.id = todoListStore.getTodo().id;
    let input_data = {
      input: data,
    };
    try {
      const { data } = await addTodoListItemMutation({
        input: input_data,
      });
      // FIXME: How do we check if the mutation was successful
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(
          error.networkError
            ? error.networkError.result.errors[0].message
            : error.graphQLErrors[0].message
        );
      } else {
        console.log('No error gotten');
      }
    }
  };

  const deleteTodoListItem = async data => {
    let input_data = {
      input: data,
    };
    try {
      const { data } = await deleteTodoListItemMutation({
        input: input_data,
      });
      console.log(data);
    } catch (error) {
      if (error) {
        console.log(
          error.networkError
            ? error.networkError.result.errors[0].message
            : error.graphQLErrors[0].message
        );
      } else {
        console.log('No error gotten');
      }
    }
  };

  const getTodayToDoList = async () => {
    let user_id = await this.getCurrentUserId();
    // FIXME: Include error handling
    if (typeof user_id == 'undefined' || user_id == '') {
      console.log('You need to authenticate first ');
      return;
    }
    const { onResult, subscribeToMore } = useQuery(
      GET_TODAY_TODO_LIST_QUERY,
      {
        user_id: user_id,
      },
      () => ({
        fetchPolicy: 'no-cache',
      })
    );
    subscribeToMore(() => ({
      document: TODO_LIST_SUBSCRIPTION,
      variables: {
        user_id: user_id,
      },
      updateQuery: (previousResult, { subscriptionData }) => {
        console.log('The subscription has been triggered');
        let newData = {
          getTodaysToDoList: [],
        };
        newData.getTodaysToDoList = subscriptionData.data.todoCreated;
        return newData;
      },
    }));
    return onResult(({ data }) => {
      console.log('On Result for todays data');
      todoListStore.setTodo(data.getTodaysToDoList);
      todoListStore.setTodoList(data.getTodaysToDoList?.todoListItems);
    });
  };

  const getCurrentWeekTodoList = async (start_date, end_date) => {
    console.log('Getting data');
    let user_id = await this.getCurrentUserId();
    if (typeof user_id == 'undefined' || user_id == '') {
      return;
    }
    const { onResult: onGetCurrentWeekTodoList } = useQuery(
      GET_CURRENT_WEEK_TODO_LIST_QUERY,
      {
        input: {
          user_id: user_id,
          start_date: start_date,
          end_date: end_date,
        },
      },
      () => ({
        fetchPolicy: 'no-cache',
      })
    );

    try {
      const { data } = onGetCurrentWeekTodoList();
      if (data) {
        console.log('On Result for the current week data');
        todoListStore.setCurrentWeekTodoList([]);
        let fetchedTodoList = [];
        let todolists = data.getThisWeeksToDoList;
        for (let todolist of todolists) {
          fetchedTodoList.push(...todolist.todoListItems);
        }
        todoListStore.setCurrentWeekTodoList(fetchedTodoList);
      }
    } catch (error) {
      let err = '';
      if (err) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'Signup was not successful! Please try again later';
      }
    }
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
    createToDoList,
    updateToDoListItem,
    addToDoListItem,
    deleteTodoListItem,
    getTodayToDoList,
    getCurrentWeekTodoList,
  };
}
