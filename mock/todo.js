let todoList = [
    { id: 1, title: 'TOdo', status: 0 },
    { id: 2, title: 'TOdo', status: 1 },
    { id: 3, title: 'TOdo', status: 2 },
    { id: 4, title: 'TOdo', status: 1 },
    { id: 5, title: 'T44do', status: 0},
]

export default {
    'GET /api/todolist': todoList,

    'POST /api/todolist': (req, res) => {
        const item = {
            id: todoList.length + 1,
            title: req.body.todo,
            status:1
        }
        todoList.push(item)
        res.send({
            message:'add todo success'
        });
    },

    'PUT /api/todolist': (req, res) => {
        const {id, status} = req.body
        
        todoList.map((item) => {
            if (item.id === id) item.status = status
            return item
        })
 
        res.send('edit todo success');
    },
}