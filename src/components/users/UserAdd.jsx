import {Button, Form, Input, Select, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {getRolesAll, userAdd, UserAmend} from "../../api/AxiosURL";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 12,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
export default function UserAdd({modify,setModify,isModalOpen, setIsModalOpen,user,setUser}) {

    const [form] = Form.useForm();
    let [part, setPart] = useState([])
    useEffect(() => {
        console.log(modify)
        form.setFieldsValue({
            user:modify.LoginName,
            pass:modify.LoginPass,
            phone:modify.LoginPhone,
            role:modify.LoginAbout?._id
        })
        // eslint-disable-next-line
    }, [modify])
    useEffect(() => {
        getRolesAll().then(({data}) => {
            setPart(data)
        })
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setModify({})
        form.resetFields()
    }
    const onFinish = async (values) => {
        if(modify.LoginName){
         let {data}=  await UserAmend({values,id:modify._id})

            setUser( user.map((item)=>item._id===data._id?data:item))

        }else {
            console.log("新增")
            let {data} = await userAdd(values)
            setUser(data,...user)
        }

        setModify({})
        setIsModalOpen(false);
        form.resetFields()
    };


    return (
        <div>
            <Button type="primary" onClick={showModal}>
                添加用户
            </Button>
            <Modal title="添加用户" forceRender open={isModalOpen} onCancel={handleCancel} footer>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}

                >
                    <Form.Item
                        name="user"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '必填项',
                            },
                        ]}
                    >
                        <Input placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="pass"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '必填项',
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机号"
                        rules={[
                            {
                                required: true,
                                message: '必填项',
                            },
                        ]}
                    >

                        <Input placeholder="请输入手机号"/>
                    </Form.Item>


                    <Form.Item
                        name="role"
                        label="角色"
                        rules={[
                            {
                                required: true,
                                message: '必填项',
                            },
                        ]}
                    >
                        <Select placeholder="请输入角色">
                            {part.map((item) => <Option value={item._id} key={item._id}>{item.roleName}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
