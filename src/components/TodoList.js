import React from 'react';
import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux';

const TodoList = () => {
    const todoList = useSelector((state) => state.items);
    const loadingStatus = useSelector((state) => state.status);

    if (loadingStatus === 'loading') {
        return <div>Tasks loading...</div>;
    }

    const todoListItems = todoList.map(todo => {
        return <TodoListItem key={todo.id} id={todo.id} />;
    })

    return (
        <ul className="list">{todoListItems}</ul>
    );
}

export default TodoList;