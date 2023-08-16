import React, { useState, useEffect } from 'react'
import { Breadcrumb, Menu, Table, Space, Input } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import HttpUtil from '../../../Util/httpUtil'
import styles from './index.module.css'
const { Search } = Input;

export default function Index() {
  const [current, setCurrent] = useState('mail');
  // const [pagination, setPagination] = useState({})
  const [commodity, setCommodity] = useState([])
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  // useEffect(() => {
  //   const { pageNum, pageSize } = pagination
  //   HttpUtil.getCommodities({
  //     pageNum,
  //     pageSize,
  //     classificationId: '',
  //     name: '',
  //     status: ''
  //   }).then((res) => {
  //     console.log(res)
  //     if (res.code === 200) {
  //       setCommodity(res.data.list)
  //     }
  //   })
  // }, [])
  // const onSearch = (value) => {
  //   const {pageNum,pageSize} = pagination
  //   console.log(value)
  //   HttpUtil.getCommodities({
  //     classificationId:'',
  //     status:'',
  //     name:value,
  //     pageNum,pageSize
  //   }).then((res) => {
  //      console.log(res)
  //   })
  // };
  const items = [
    {
      label: <Link to='./homePage'>项目管理</Link>,
      key: '1',
    },
    {
      label: <Link to='./increase'>添加项目</Link>,
      key: '2',
    },
    {
      label: <Link to='./batchIncrease'>批量添加项目</Link>,
      key: '3',
    },
  ];
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
        <Breadcrumb.Item>项目管理</Breadcrumb.Item>
        <Breadcrumb.Item>项目列表</Breadcrumb.Item>
      </Breadcrumb>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} >

      </Menu>
     
      <Outlet />
    </>

  )
}
