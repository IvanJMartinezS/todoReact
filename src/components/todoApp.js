import {useState} from 'react';
import Todo from './todo';

import "./todoApp.css";

export default function TodoApp(){
    
    const [title, setTitle] = useState("Hello");
    const [todos, setTodos] = useState([]);

    function handleChange(e){
        const value = e.target.value;

        setTitle(value);
    }
    
    function handleSubmit(e){
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        };

        const temp = [...todos];
        temp.unshift(newTodo);

        setTodos(temp);
        //setTodos([...todos, newTodo]);

        setTitle("");
    }

    function handleUpdate(id, value){
        const temp = [...todos];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    function handleOnDelete(id){
        const temp = todos.filter(item => item.id !== id);
        setTodos(temp);
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" inSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title}/>
            <input onClick={handleSubmit} type="submit" value="Create to-do" className="buttonCreate"/>
        </form>

        <div className="todosContainer">
            {todos.map(item => (
                <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleOnDelete}/>
            ))}
        </div>

    </div>
}