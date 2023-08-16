import React, { useState, useEffect, useRef } from 'react'
import { Modal, Table, Space, Form, Input, Select, Button, message } from 'antd'
import HttpUtil from '../../../../Util/httpUtil'
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select
export default function Index() {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  const [searchPagination,setSearchPagination] = useState({
    searchPagNum:1,
    searchPageSize:10,
    searchTotal:0
  })
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('修改服务费');
  const [commodity, setCommodity] = useState([])
  const [one, setOne] = useState({
    id: null,
    name: '',
    classificationId: null,
    specification: '',
    sort: null,
    price: null,
    unit: '',
    description: ''
  })
  const [id,setId] = useState()
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState([])
  const [description, setDescroption] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const FormRef = useRef(null)
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
      key: 'spacification',
    },
    {
      title: '项目分类',
      dataIndex: 'classificationName',
      key: 'classificationName',
    },
    {
      title: '项目描述',
      dataIndex: 'description',
      key: 'description',
      render: (_, record, index) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a onClick={showModalDescription.bind(this, record.id)}>查看</a>
        </Space>
      ),
    },
    {
      title: '显示顺序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '项目价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <a>￥{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a onClick={showModal.bind(this, record.id)}>编辑</a>
          <a onClick={deleteCommodity.bind(this, record.id)} style={{ "color": '#E51C23' }}>删除</a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    const { pageNum, pageSize } = pagination
    console.log(pagination)
    HttpUtil.getCommodities({
      pageNum,
      pageSize,
      classificationId: '',
      name: '',
      status: ''
    }).then((res) => {
      // console.log(res)
      if (res.code === 200) {
        setCommodity(res.data.list)
        setPagination({
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total
        })
        const mapped = res.data.list.map((obj, index) => obj.unit)
        const filtered = mapped.filter((type, index) => mapped.indexOf(type) === index)
        setFilter(filtered)
      } else {
        message.error(res.msg)
      }
    })
    HttpUtil.getCategories().then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        setCategory(res.data)
      } else {
        message.error(res.msg)
      }

    })
    FormRef && FormRef.current && FormRef.current.resetFields()
  }, [setCommodity, one])
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const showModalDescription = (id) => {
    setIsModalOpen(true);
    console.log(id)
    HttpUtil.getOneCommodity({ id }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const { description } = res.data
        setDescroption({
          id, description
        })
      }
    })
  }
  const handleOkDescription = () => {
    setIsModalOpen(false);
  }
  const handleCancelDescription = () => {
    setIsModalOpen(false)
  };
  const showModal = (id) => {
    setOpen(true);
    // console.log(id)
    HttpUtil.getOneCommodity({ id }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const { name, classificationId, specification, sort, price, unit, description } = res.data
        setOne({
          id, name, classificationId, specification, sort, price, unit, description
        })
      }
    })
  };
  const handleOk = () => {
    console.log(one.id)
    form.validateFields().then(async (values) => {
      console.log(values)
      const { name, classificationId, specification, sort, price, unit, description } = values
      HttpUtil.updateCommodity({
        id: one.id,
        name, classificationId, specification, sort, price, unit, description
      }).then((res) => {
        console.log(res)
        message.success("修改成功")
        const { pageNum, pageSize } = pagination
        console.log(pagination)
        HttpUtil.getCommodities({
          pageNum,
          pageSize,
          classificationId: '',
          name: '',
          status: ''
        }).then((res) => {
          if (res.code === 200) {
            setCommodity(res.data.list)
          } else {
            message.error(res.msg)
          }
        })
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 1000);

      })
    })

  };
  const cancelModel = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const deleteCommodity = (id) => {
    setIsModalVisible(true)
    console.log(id)
    setId(id)
   
  }
  const modalHandleOk = () => {
    console.log(id)
    setIsModalVisible(false)
     HttpUtil.deleteCommodities({ id }).then((res) => {
        console.log(res)
        message.success('删除项目成功')
        const { pageNum, pageSize } = pagination
        HttpUtil.getCommodities({
          pageNum,
          pageSize,
          classificationId: '',
          name: '',
          status: ''
        }).then((res) => {
          console.log(res)
          setCommodity(res.data.list)
          setPagination({
            pageNum: res.data.pageNum,
            pageSize: res.data.pageSize,
            total: res.data.total
          })
        })
      })
  }
  const onTableChange = (pagination) => {
    console.log(pagination)
    const { current, pageSize } = pagination
    HttpUtil.getCommodities({
      pageNum: current,
      pageSize,
      classificationId: '',
      name: '',
      status: ''
    }).then((res) => {
      console.log(res)
      setCommodity(res.data.list)
      setPagination({
        pageNum: current,
        pageSize,
        total: res.data.total
      })
    })
  }

  const onSearch = (value) => {
    const { searchPagNum, searchPageSize} = searchPagination
    console.log(value)
    HttpUtil.getCommodities({
      classificationId: '',
      status: '',
      name: value,
      pageNum:searchPagNum,
      pageSize:searchPageSize
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        setCommodity(res.data.list)
        setSearchPagination({
          searchPagNum: res.data.pageNum,
          searchPageSize: res.data.pageSize,
          searchTotal: res.data.total
        })
        const mapped = res.data.list.map((obj, index) => obj.unit)
        const filtered = mapped.filter((type, index) => mapped.indexOf(type) === index)
        setFilter(filtered)
      } else {
        message.error(res.msg)
      }
    })
  };
  return (
    <>
      <Space direction="vertical" style={{ float: 'right', gap: 8, marginTop: '-2.4%' }}>
        <Search
          placeholder="请输入项目名称"
          onSearch={onSearch}
          style={{
            width: 400,
          }}
          enterButton
        />
      </Space>
      <Table columns={columns} dataSource={commodity} pagination={pagination} onChange={onTableChange} />
      <Modal
        title="项目描述"
        open={isModalOpen}
        onOk={handleOkDescription}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDescription}
        okText={'确定'}
        cancelText={'取消'}
      >
        <p>{description.description}</p>
      </Modal>
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
          id="addCommodity"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            name: one.name,
            specification: one.specification,
            // classificationName: one.classificationName,
            sort: one.sort,
            price: one.price,
            unit: one.unit,
            classificationId: one.classificationId
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
            label="规格型号"
            name="specification"
            rules={[
              {
                required: true,
                message: '请输入规格型号',
              },
            ]}
          >
            <Input key={one.specification} defaultValue={one.specification} value={one.specification} />
          </Form.Item> <Form.Item
            label="项目价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入项目价格',
              },
            ]}
          >
            <Input key={one.price} defaultValue={one.price} value={one.price} />
          </Form.Item>
          <Form.Item
            label="项目分类"
            name="classificationId"
            rules={[
              {
                required: true,
                message: '请选择项目分类',
              },
            ]}
          >
            <Select>
              {
                category.map((item) => {
                  return (
                    <Option value={item.id} >{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="计量单位"
            name="unit"
            rules={[
              {
                required: true,
                message: '请选择计量单位',
              },
            ]}
          >
            <Select>
              {
                filter.map((item) => {
                  return (
                    <Option value={item}>{item}</Option>
                  )
                })
              }
            </Select>
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
        <p>确认删除该项目</p>
      </Modal>
    </>
  )
}
