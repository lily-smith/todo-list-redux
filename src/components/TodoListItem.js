import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemById, saveToggledTodo, saveDeletedTodo } from '../reducer';

const TodoListItem = ({ id })=> {
    const item = useSelector((state) => selectItemById(state, id));
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(saveToggledTodo(id));
    }

    const handleClickDelete = () => {
        dispatch(saveDeletedTodo(id));
    }

    return(
        <div className="task">
            <input className="toggle" type="checkbox" checked={item.completed} onChange={handleToggle} />
            <div className="itemText">{item.text}</div>
            <button className="delete" onClick={handleClickDelete}>Delete</button>
        </div>
    );
}

export default TodoListItem;