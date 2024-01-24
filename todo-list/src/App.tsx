
import { useEffect, useState } from 'react';
import { TodoProvider } from './app/contexts/Todo';
import { Todo } from './app/models/Todo';
import { nanoid } from 'nanoid';
import TodoForm from './app/components/TodoForm';
import TodoItem from './app/components/TodoItem';

function App() {
  const LOCAL_STORE = 'todos';

  const [todos, setTodos] = useState<Array<Todo>>([]);

  const addTodo = (message: string) => {
    setTodos((prev) => [{ id: nanoid(), message, completed: false }, ...prev])
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const updateTodo = (id: string, message: string) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { id, message, completed: todo.completed } : todo));
  }

  const toggleComplete = (id: string) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORE) ?? '{}');
    storedTodos && storedTodos.length > 0 && setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORE, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ addTodo, deleteTodo, updateTodo, toggleComplete, todos }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
