import { getTodoList } from '@/services/todo';

export default {
    namespace: 'todo',
    
    state: {
        todoList:[]
    },

    effects: {
        *getTodoList(_, { call, put }) {
            const resData = yield call(getTodoList)
            console.log(resData);
            yield put({
                type: 'setTodoList',
                payload: resData
            })
        }
    },

    reducers: {
        setTodoList(state, {payload}) {
            return {
                ...state,
                todoList: payload
            }
        }
    }
}