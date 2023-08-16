import React, { Component } from 'react'
import {AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,} from '@ant-design/icons';
import { Menu,theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { SubMenu } = Menu
const items = [
    { title: '系统菜单', key: '1', icon: <PieChartOutlined />,disabled:'true' },
    { title: '项目管理', key: '2',   path: `/home/commodity/homePage/` },
    { title: '分类管理', key: '3',  path: '/home/category/homePage' },
    { title: '服务费管理', key: '4',  path: '/home/serviceFee/homePage' },
    { title: '报价单管理', key: '5',  path: '/home/price' },
    { title: '用户管理', key: '6',  path: '/home/user/homePage' },
]
const item = [
    { title: '系统菜单', key: '1', icon: <PieChartOutlined />,disabled:'true' },
    { title: '项目管理', key: '2',   path: `/home/commodity/homePage/` },
    { title: '分类管理', key: '3',  path: '/home/category/homePage' },
    { title: '服务费管理', key: '4',  path: '/home/serviceFee/homePage' },
]
const type = localStorage.getItem('type')
console.log(type)
export default class Nav extends Component {
    
    menuTag = function deep(items) {
        console.log(items)
        if (items && items.length > 0) {
            return items.map(item => {
                if (item.children && item.children.length > 0) {
                    return (<SubMenu key={item.path} icon={item.icon} title={item.title}>
                        {deep(item.children)}
                    </SubMenu>)
                }
                return (<Menu.Item key={item.path} icon={item.icon}>
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>)
            })
        }
    }
    render() {
        return (
            <>
                <Menu 
                    mode="inline"
                    theme="light"
                >
                    {
                    type == '超级管理员' ?this.menuTag(items) :this.menuTag(item)
                    }
    
                </Menu>
            </>
        );
    }



}

