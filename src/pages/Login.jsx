import React from 'react'
import '../assets/scss/login.scss'
import {Button, Form, Input} from 'antd';
import {useCallback} from "react";
import {login} from "../api/AxiosURL";
import {useNavigate}from "react-router-dom"
import {setSession} from "../api/session";
export default function Login() {

    const [form] = Form.useForm();
    const router=useNavigate()
    // 获取表单数据
    // const onCheck = async () => {
    //     try {
    //         const values = await form.validateFields();
    //         if (values.username && values.password) {
    //             // 不为空 将登录  axios登录
    //             let result = await login(values)
    //             console.log(result);
    //         }
    //     } catch (errorInfo) {
    //         // 验证不通过
    //         console.log('Failed:', errorInfo);
    //     }
    // };
    const onFinish = async (values) => {
        if (values.username && values.password) {
            // 不为空 将登录  axios登录
            let result = await login(values)
            setSession("userInfo",result.data)
            if(result.code)
           router("/home/admin",{
               state:{
                   name:"首页"
               }
           })
        }
    };
    // 账号验证
    const validatorName = useCallback((_, value) => {
        let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;
        return new Promise((res, rej) => {
            if (value === " ") {
                rej("不能为空");
            } else if (!reg.test(value)) {
                rej("需要提供3-6");
            } else {
                res();
            }
        })
    }, [])
    // 验证密码
    const validatorPass = useCallback((_, value) => {
        let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]{}:;',.<>/?]{6,15}$/;
        return new Promise((res, rej) => {
            if (value === " ") {
                rej("需要输入密码");
            } else if (!reg.test(value)) {
                rej("6到15,不能为中文");
            } else {
                res();
            }
        })
    }, [])
    return (
        <div className='login_box'>
            <div className="center">
                <h2>后台登录</h2>
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                                validator: validatorName
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                                validator: validatorPass
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
