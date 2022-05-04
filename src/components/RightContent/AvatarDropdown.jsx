import React, { useCallback, useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'dva'
import { LogoutOutlined, SettingOutlined, UserOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Badge } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { getTodoList } from '@/services/todo';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {

  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
  }, [])

  let todoList = useSelector(state => state.todo.todoList)
  let todoNum = todoList.filter(item => item.status === 1).length


  // let [todos, setTodos] = useState(0)
  // useEffect(async () => {
  //   const todoList = await getTodoList()
  //   const todoNum = todoList.filter(item => item.status === 1).length
  //   setTodos(todoNum)
  // })

  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="todo">
        <UnorderedListOutlined />
        Todos<Badge count={todoNum} />
      </Menu.Item>
      
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>
          {currentUser.name}
          <Badge count={todoNum} offset={ [10,0]} dot={true} /></span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
