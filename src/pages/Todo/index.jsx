import { PageContainer } from '@ant-design/pro-layout'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Tooltip, Form, Input, Checkbox } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import { Alert, Modal } from 'antd';
import React, { useEffect,useState } from 'react'
import { getTodoList,addTodoList, editTodoList } from '@/services/todo';
import useGetTodo from '@/models/todo';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {useSelector, useDispatch} from 'dva'




export default function todo() {

  const status = [
    <Alert message="Finished" type="success" showIcon />,
    <Alert message="Todo" type="info" showIcon />,
    <Alert message="Canceled" type="error" showIcon />,
  ]
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_,record) => [
        status[record.status]
      ]
    },
    {
      title: 'Change Status',  
      render: (_, record) => {
        let editOperation = []
        if (record.status !== 0) {
          editOperation.push(<a key={1} onClick={()=>changeStatus(record.id, 0)}>Finish </a>,)
        }
        if (record.status !== 1) {
          editOperation.push(<a key={0} onClick={()=>changeStatus(record.id, 1)}>Todo </a>,)
        }
        if (record.status !== 2) {
          editOperation.push(<a key={2} onClick={()=>changeStatus(record.id, 2)}>Cancel </a>,)
        }
        return editOperation
      }
    },
  
  ];

  const dispatch = useDispatch()
  let todoList = useSelector(state => state.todo.todoList)

  // const [data,setData] = useState([])

  useEffect(() => {
    // const resData = todoList
    // setData(resData)
    dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
  },[])

  const [isModalVisible, setIsModalVisible] = useState(false);  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
     setIsModalVisible(false);
  };

  const handleFinish = async (value) => {
    // const newData = await addTodoList(value)
    // setData(newData)
    addTodoList(value)
    dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
    setIsModalVisible(false);
    value = ''
  }

  const changeStatus = async (id, status) => {
    const res = await editTodoList({ id, status })
    dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
}

  return (
    <PageHeaderWrapper>
      <ProTable
      columns={columns}
      rowKey="id"
      search={false}
      dateFormatter="string"
      dataSource={todoList}
      // request={async ()=>({data: await getTodoList()})}
      headerTitle="Todolist"
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={showModal}>
          <PlusOutlined />new todo
        </Button>,
      ]}
      />
      <Modal title="Create new todo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <ProForm onFinish={value => handleFinish(value)}>
            <ProFormText name="todo" label="Todo" rules={[{required:true}]}/>
          </ProForm>
      </Modal>
    </PageHeaderWrapper>
  )
}
