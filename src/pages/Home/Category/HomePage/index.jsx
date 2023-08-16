import React, { useRef, useState } from 'react'
import { Table, Space, message, Modal, Input, Form } from 'antd'
import { useEffect } from 'react';
import HttpUtil from '../../../../Util/httpUtil'
const { TextArea } = Input;
export default function Index() {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  const [category, setCategory] = useState([])
  const [one, setOne] = useState({
    name: '',
    sort: null,
    description: ''
  })
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const FormRef = useRef(null)
  const [form] = Form.useForm();
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分类描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '显示顺序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a onClick={showModal.bind(this, record.id)}>编辑</a>
          <a onClick={deleteCategory.bind(this, record.id)} style={{ "color": '#E51C23' }}>删除</a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    const { pageNum, pageSize } = pagination
    HttpUtil.getCategories().then((res) => {
      // console.log(res)
      setCategory(res.data)
      console.log(category)
      setPagination({
        pageNum,
        pageSize,
        total: res.data.total
      })
    })
    FormRef && FormRef.current && FormRef.current.resetFields()
  }, [one])
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const showModal = (id) => {
    setOpen(true);
    console.log(id)
    HttpUtil.getOneCategory({ id }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const { name, sort, description } = res.data
        setOne({
          id, name, sort, description
        })
      }
    })
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values)
      const { description, sort, name } = values
      HttpUtil.updateCategory({
        id: one.id,
        description, sort, name
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          HttpUtil.getCategories().then((res) => {
            // console.log(res)
            if (res.code === 200) {
              message.success("修改成功")
              setCategory(res.data)
              console.log(category)
              setPagination({
                total: res.data.total
              })
              setConfirmLoading(true);
              setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
              }, 1000);
            } else {
              message.error(res.msg)
            }

          })
        }
      })
    })
  }
  const cancelModel = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const deleteCategory = (id) => {
    console.log(id)
    setId(id)
    setIsModalVisible(true)
  }
  const modalHandleOk = () => {
    setIsModalVisible(false)
    // console.log(id)
    HttpUtil.deleteCategory({ id }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        message.success("删除成功")
        HttpUtil.getCategories().then((res) => {
          // console.log(res)
          setCategory(res.data)
          console.log(category)
          setPagination({
            total: res.data.total
          })
        })
      } else {
        message.error(res.msg)
      }
    })
  }
  return (
    <>
      <Table columns={columns} dataSource={category} pagination={pagination} />
      <Modal
        title="编辑项目"
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
          id="updateCategory"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            name: one.name,
            sort: one.sort,
            description: one.description
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"

        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input key={one.name} defaultValue={one.name} value={one.name} />
          </Form.Item>

          <Form.Item
            label="显示顺序"
            name="sort"
          >
            < Input key={one.sort} defaultValue={one.sort} value={one.sort} />
          </Form.Item>
          <Form.Item
            label="项目描述"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入项目描述',
              },
            ]}
          >
            <TextArea rows={5} key={one.description} defaultValue={one.description} value={one.description} />
          </Form.Item>
        </Form>
      </Modal >
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
        <p>确认删除该分类</p>
      </Modal>
    </>
  )
}
