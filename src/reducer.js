import axios from 'axios';

const initialState = {
    status: 'idle',
    items: [],
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_TODO':
            const index = state.items.findIndex(todo => todo.id === action.payload.id);

            const copiedArray = [...state.items];
            copiedArray[index].completed = !copiedArray[index].completed;

            return {
                ...state,
                items: copiedArray
            }
        case 'ADD_TODO':
            return {
                ...state,
                items: [
                    ...state.items, 
                    action.payload.item
                ],
            }
        case 'DELETE_TODO':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        case 'TODOS_LOADING':
            return {
                ...state,
                status: 'loading'
            }
        case 'TODOS_LOADED':
            const newTasks = [];
            action.payload.tasks.forEach((task) => {
                newTasks.push(task);
            });
            return {
                ...state,
                items: newTasks,
                status: 'idle'
            }
        default:
            return state;
    }
}

export const todoToggled = (todoId) => {
    return ({
        type: 'TOGGLE_TODO',
        payload: {
            id: todoId
        }
    });
}

export const todoAdded = (newTask) => {
    return ({
        type: 'ADD_TODO',
        payload: {
            item: newTask
        }
    });
}

export const todoDeleted = (todoId) => {
    return ({
        type: 'DELETE_TODO',
        payload: {
            id: todoId
        }
    });
}

export const todosLoading = () => {
    return ({
        type: 'TODOS_LOADING'
    });
}

export const todosLoaded = (todos) => {
    return({
        type: 'TODOS_LOADED',
        payload: {
            tasks: todos
        }
    });
}


export const selectItemById = (state, todoId) => {
    return state.items.find(item => item.id === todoId);
}


export const fetchTodos = () => async (dispatch) => {
    dispatch(todosLoading());
    const response = await axios.get('http://localhost:3001/getalltasks');
    dispatch(todosLoaded(response.data));
}

export const saveNewTodo = (text) => async (dispatch) => {
    const response = await axios.post('http://localhost:3001/addtask', { text: text });
    dispatch(todoAdded(response.data));
}

export const saveToggledTodo = (todoId) => async (dispatch) => {
    const response = await axios.put('http://localhost:3001/toggletask/' + todoId);
    dispatch(todoToggled(response.data.id));
}

export const saveDeletedTodo = (todoId) => async (dispatch) => {
    const response = await axios.put('http://localhost:3001/deletetask/' + todoId);
    dispatch(todoDeleted(response.data.id));
}

export default reducer;