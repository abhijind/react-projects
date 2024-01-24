import { FormEvent, useState } from "react";
import { useTodo } from "../contexts/Todo";

function TodoForm() {
    const [todo, setTodo] = useState('');

    const { addTodo } = useTodo();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(todo);
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                value={todo}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;