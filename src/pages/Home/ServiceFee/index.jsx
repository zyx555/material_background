import React,{useState} from 'react'
import {Breadcrumb,Menu,Table,Space} from 'antd'
import {Link,Outlet} from 'react-router-dom'
const items = [
    {
      label: <Link to='./homePage'>服务费管理</Link>,
      key: '1',
    },
    {
      label: <Link to='./increase'>添加服务费</Link>,
      key: '2',
    },
    
  ];
 

export default function Index() {
    const [current, setCurrent] = useState('mail');
    const [pagination,setPagination] =useState({})
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
            <Breadcrumb.Item>服务费管理</Breadcrumb.Item>
            
          </Breadcrumb>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          <Outlet/>
          </>
  )
}
