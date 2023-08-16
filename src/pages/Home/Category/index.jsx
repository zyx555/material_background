import React,{useState} from 'react'
import {Breadcrumb,Menu,Table,Space} from 'antd'
import { Link, Outlet } from 'react-router-dom'
const items = [
    {
      label: <Link to='./homePage'>分类列表</Link>,
      key: '1',
    },
    {
      label: <Link to='./increase'>添加分类</Link>,
      key: '2',
    },
    {
      label: <Link to='./batchIncrease'>批量添加分类</Link>,
      key: '3',
    },
  ];

export default function Index() {
   
    const [current, setCurrent] = useState('mail');
    const [pagination,setPagination] = useState({})
    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
  return (
    <>
     <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>商品分类管理</Breadcrumb.Item>
            <Breadcrumb.Item>分类列表</Breadcrumb.Item>
          </Breadcrumb>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Outlet/>
    </>
  )
}
