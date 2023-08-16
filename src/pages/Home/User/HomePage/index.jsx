import React, { useState, useEffect, useRef } from 'react'
import {  Table, Space, message, Input, Form, Modal } from 'antd'
import HttpUtil from '../../../../Util/httpUtil'

export default function Index() {
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  const [user, setUser] = useState([])
  const [one, setOne] = useState({
    id: null,
    realName: '',
    jobNumber: null,
    password: null
  })
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [id,setId] = useState()
  const FormRef = useRef(null)
  const [form] = Form.useForm();
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '工号',
      dataIndex: 'jobNumber',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '用户类型',
      dataIndex: 'roleName',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showModal.bind(this, record.id)}>重置密码</a>
          <a onClick={deleteUser.bind(this, record.id)} style={{"color":'#E51C23'}}>删除</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    console.log(pagination)
    const { pageNum, pageSize } = pagination
    HttpUtil.getUsers({
      pageNum,
      pageSize
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        const data = res.data.list
        setUser(data)
        setPagination({
          total: res.data.total,
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize
        })
        console.log(user)
      } else {
        message.error(res.msg)
      }

    })
    FormRef && FormRef.current && FormRef.current.resetFields()
  }, [setUser,one])


  const onTableChange = (paginationState) => {
    console.log(paginationState);
    const { current, pageSize } = paginationState
    HttpUtil.getUsers({
      pageNum: current,
      pageSize
    }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const data = res.data.list
        setUser(data)
        setPagination({
          total: res.data.total,
          pageNum: current,
          pageSize
        })
        console.log(user)
      }else{
        message.error(res.msg)
      }

    })
  }
  const showModal = (id) => {
    setOpen(true);
    console.log(id)
    setOne(id)
    HttpUtil.getUser({ id }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const { realName, jobNumber, password,roleName } = res.data
        setOne({
          id, realName, jobNumber, password,roleName
        })
      }
    })
  };
  const cancelModel =()=>{
    setIsModalVisible(false)
  }
  const deleteUser = (id) => {
    setId(id)
    setIsModalVisible(true)
  }
const modalHandleOk =()=>{
  setIsModalVisible(false)
  HttpUtil.deleteUser({ id }).then((res) => {
    console.log(res)
    if (res.code === 200) {
      message.success('删除成功')
      const { pageNum, pageSize } = pagination
      HttpUtil.getUsers({
        pageNum,
        pageSize
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          const data = res.data.list
          setUser(data)
          setPagination({
            total: res.data.total,
            pageNum: res.data.pageNum,
            pageSize: res.data.pageSize
          })
          console.log(user)
        } else {
          message.error(res.msg)
        }

      })
    } else {
      message.error(res.msg)
    }


  })
}
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    console.log(pagination)

    form.validateFields().then(async (values) => {
      const { jobNumber, password } = values
      HttpUtil.updatePwd({
        id: one.id,
        jobNumber, password
      }).then((res) => {
        console.log(res)
        const { pageNum, pageSize } = pagination
        if (res.code === 200) {
          message.success("修改成功")
          HttpUtil.getUsers({
            pageNum,
            pageSize
          }).then((res) => {
            console.log(res)
            if (res.code === 200) {
              const data = res.data.list
              setUser(data)
              setPagination({
                pageNum: res.data.pageNum,
                pageSize: res.data.pageSize,
                total: res.data.total
              })
            } else {
              message.error(res.msg)
            }
          })
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 1000);
        }
      })
    })


  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Table columns={columns} key={user.id} dataSource={user} pagination={pagination} onChange={onTableChange} />
      <Modal
        title="重置密码"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={'修改'}
        cancelText={'取消'}
      >

        <Form
          ref={FormRef}
          form={form}
          name="basic"
          id="updatePsw"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            // realName: one.realName,
            jobNumber: one.jobNumber,
            password: one.password
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="realName"
            required={false}
          >
            <Input defaultValue={one.realName} key={one.realName} disabled={true} />
          </Form.Item>
          <Form.Item
            label="工号"
            name="jobNumber"
            rules={[
              {
                required: true,
                message: '请输入工号',
              },
            ]}
          >
            <Input defaultValue={one.jobNumber} key={one.jobNumber} />
          </Form.Item>

          <Form.Item
            label="用户类型"
            name="roleName"
          >
            < Input defaultValue={one.realName} key={one.realName} disabled={true} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            < Input defaultValue={one.password} key={one.password} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="删除操作"
        open={isModalVisible}
        onOk={modalHandleOk}
        onCancel={cancelModel}
        // footer={null}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <p>确认删除该用户</p>
      </Modal>
    </>
  )
}
