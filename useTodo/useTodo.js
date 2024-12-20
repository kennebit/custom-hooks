import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem('TodoList')) || [];
}
export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('TodoList',JSON.stringify(todos));
      }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatch( action );
        console.log({todo});
    }
    const handleRemoveTodo = ( todo ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: todo,
        }
        dispatch( action );
    }
    const handleToggleTodo = ( todo ) => {
        console.log('Cambiar el Done de ',todo);
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: todo
        });
    }
    return {
        todos,
        todosCount: todos.length,
        todosPendingCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,
    }
}
