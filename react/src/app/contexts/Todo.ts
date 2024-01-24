/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { Todo } from "../models/Todo";

export const TodoContext = createContext({
    todos: new Array<Todo>(),
    addTodo: (_message: string) => { },
    updateTodo: (_id: string, _message: string) => { },
    deleteTodo: (_id: string) => { },
    toggleComplete: (_id: string) => { }
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;

