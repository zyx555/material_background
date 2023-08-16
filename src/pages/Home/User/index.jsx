import React, { useState } from 'react'
import { Breadcrumb, Menu,Table,Space ,message} from 'antd'
import { Outlet,Link } from 'react-router-dom';
import HttpUtil from '../../../Util/httpUtil'
const items = [
    {
        label: <Link to='./homePage'>查看用户</Link>,
        key: '1',
    },
    {
        label: <Link to='./increase'>添加用户</Link>,
        key: '2',
    },
];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };


export default function Index() {
    const [current, setCurrent] = useState('mail');
    const [pagination, setPagination] = useState({})
    const [selectionType, setSelectionType] = useState('checkbox');
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
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>查看用户</Breadcrumb.Item>
            </Breadcrumb>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
           <Outlet/>
        </>
    )
}
