import React, { useState, useEffect } from 'react'
import { Breadcrumb, Menu, Table, Space, Input, message } from 'antd'
import HttpUtil from '../../../Util/httpUtil'
import axios from 'axios'
import moment from 'moment'
import baseUrl from '../../../globalData'
const { Search } = Input
export default function Index() {
  const [current, setCurrent] = useState('mail');
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  const [searchPagination, setSearchPagination] = useState({
    searchPagNum: 1,
    searchPageSize: 10,
    searchTotal: 0
  })
  const [price, setPrice] = useState([])
  const [fileLocation, setFileLocation] = useState()
  const [time, setTime] = useState()
  const items = [
    {
      label: '报价单管理',
      key: '1',
    },

  ];
  const columns = [
    {
      title: '报价单名称',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '销售专员',
      dataIndex: 'userRealName',
      key: 'userRealName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a onClick={downloadTemplate.bind(this, record)}>下载</a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    const { pageSize, pageNum } = pagination
    HttpUtil.getPrice({
      pageSize,
      pageNum,
      name: ''
    }).then((res) => {
      if (res.code === 200) {
        console.log(res.data)
        setPrice(res.data.list)
        setPagination({
          pageNum,
          pageSize,
          total: res.data.total
        })

      }

    })
  }, [])
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    console.log(time)
  };
  const onTableChange = (paginationState) => {
    const { current, pageSize } = paginationState
    HttpUtil.getPrice({
      pageSize,
      pageNum: current,
      name: ''
    }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        setPrice(res.data.list)
        let date = Date.parse(res.data.list.createdTime)
        let strDate = new Date(date).toLocaleDateString()
        setTime(strDate)
        setPagination({
          pageNum: current,
          pageSize,
          total: res.data.total
        })
      } else {
        message.error(res.msg)
      }

    })
  }
  function downloadFile(res, item) {
    console.log(res)
    console.log(item.fileName)
    const a = document.createElement('a');
    const blob = new Blob([res], {
      type: "application/pdf"
    });
    const url = window.URL.createObjectURL(blob);
    const filename = item.fileName
    a.download = filename
    a.setAttribute('href', url);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const downloadTemplate = (file) => {
    console.log(file)
    axios({
      method: "get",
      url:baseUrl+file.fileLocation,
      responseType: 'blob',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") || null,
      },
      // data
    }).then((res) => {
      console.log(res)
      downloadFile(res.data, file)
    })
  }
  const onSearch = (value) => {
    const { searchPagNum, searchPageSize } = searchPagination
    console.log(value)
    HttpUtil.getPrice({
      name: value,
      pageNum: searchPagNum,
      pageSize: searchPageSize
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        console.log(res.data)
        setPrice(res.data.list)
        setSearchPagination({
          searchPagNum: res.data.pageNum,
          searchPageSize: res.data.pageSize,
          searchTotal: res.data.total
        })
      } else {
        message.error(res.msg)
      }
    })
  };
  return (
    <>

      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>报价单管理</Breadcrumb.Item>
      </Breadcrumb>

      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Space direction="vertical" style={{ float: 'right', gap: 8, marginTop: '-2.4%' }}>
        <Search
          placeholder="请输入商品名称"
          onSearch={onSearch}
          style={{
            width: 400,
          }}
          enterButton
        />
      </Space>
      <Table columns={columns} dataSource={price} pagination={pagination} onChange={onTableChange} />

    </>
  )
}
