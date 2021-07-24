import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../reducer';

const Header = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleTextKeyDown = (e) => {
        const trimmedText = text.trim();
        if (e.which === 13 && trimmedText) {
            dispatch(saveNewTodo(trimmedText)); // add dispatch
            setText('');
        }
    }

    return (
        <input className="inputBox" type="text" value={text} onChange={handleTextChange} onKeyDown={handleTextKeyDown} placeholder="Type task here" />
    );
}

export default Header;