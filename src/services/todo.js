import request from "umi-request";

export const getTodoList = async () => {
    // console.log('request');
    return request('/api/todolist')
}

export const addTodoList = async (data) => {
    // console.log(data);
    return request.post('/api/todolist', {data})
}

export const editTodoList = async (data) => {
    // console.log(data);
    
    return request.put('/api/todolist', {data})
}