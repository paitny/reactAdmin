import {useEffect, useState} from 'react';
import {Card, PageHeader, Divider, Form, Input, Button, Select, Upload, Modal} from 'antd';
import "../../assets/scss/waresAdd.scss"
import {useNavigate, useLocation} from "react-router-dom";
import {PlusOutlined} from '@ant-design/icons';
import {getGoods, shopAdd, shopImg, shopImgRemove, url} from "../../api/AxiosURL";

const {Option} = Select
const {TextArea} = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });
export default function WaresAdd() {
    let [opt, setOpt] = useState([])
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const {state} = useLocation()

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);
    let init = {
        nickname: "",
        nameThe: "",
        text: "",
        confirm: "",
        goodsImg: []
    }

    useEffect(() => {
        getGoods().then(({data}) => {
            setOpt(data)

            setFileList(init.goodsImg)
        })
        return (() => {
            let bol = form.getFieldValue("goodsImg")
            if (!state.nickname && !bol) {
                if (bol) {
                    // 离开路由时 上传了图片 为进行存储到数据库的数据进行删除
                    let arr = bol.fileList.map((item) => {
                        return item.response.data
                    })
                    shopImgRemove({arr})
                }
            }

            form.resetFields()
        })
        // eslint-disable-next-line
    }, [])

    if (state.nickname) {
        init = {
            nickname: state.nickname,
            nameThe: state.nameThe,
            text: state.text,
            confirm: state.confirm,
            goodsImg: state.goodsImg.map((item, index) => {
                return {
                    name: item.imgUrl,
                    uid: index,
                    id: state._id,
                    url: url + "/" + item.imgUrl
                }
            })
        }
    }
    const onFinish = async (values) => {
        console.log(values)
        // 图片有新提交  数据结构处理完成
        if (values.goodsImg.fileList) {
            values.goodsImg = values.goodsImg.fileList.map((item) => {
                // 存在data
                if (item.response?.data) {
                    return item.response.data
                } else {
                    return {
                        imgUrl: item.name
                    }
                }
            })

        } else { // 没有图片重新提交
            values.goodsImg = values.goodsImg.map((item) => {
                return {
                    imgUrl: item.name
                }
            })
        }
        if (state.nickname) { // true 更新
            values.id = state._id
            await shopAdd(values);
            navigate(-1)
            setFileList([])
        } else {  // 重新创建
            await shopAdd(values);
        }
        form.resetFields()
        setFileList([])
    };


    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };


    const handleChange = ({fileList: newFileList}) => setFileList(newFileList)
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const handleDelete = async (file) => {
        let val = file.response?.data
        if (val) {
            await shopImgRemove(val)
        } else {
            await shopImgRemove({imgUrl: file.name, id: file.id})
        }

    }
    return (
        <div>
            <Card>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        navigate(-1)
                    }}
                    title="返回添加商品"
                />
                <Divider/>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    onFinish={onFinish}
                    initialValues={init}
                >
                    <Form.Item label="商品分类"
                               name="nickname"
                               rules={[
                                   {
                                       required: true,
                                       message: '必填项',
                                   },
                               ]}>
                        <Select placeholder="请选择">
                            {
                                opt.map((item) => {
                                    return (<Option
                                            value={item.accountName}
                                            key={item._id}>{item.accountName}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="商品名称"
                               placeholder="商品名称"
                               name="nameThe"
                               rules={[
                                   {
                                       required: true,
                                       message: '必填项',
                                   },
                               ]}
                    >
                        <Input placeholder="商品名称"/>
                    </Form.Item>
                    <Form.Item label="商品描述"
                               name="text"
                               rules={[
                                   {
                                       required: true,
                                       message: '必填项',
                                   },
                               ]}
                    >
                        <TextArea placeholder="商品信息描述" rows={4}/>
                    </Form.Item>
                    <Form.Item label="商品价格"
                               name="confirm"
                               rules={[
                                   {
                                       required: true,
                                       message: '必填项',
                                   },
                               ]}
                    >
                        <Input placeholder="请输入商品价格" addonAfter="元"/>
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                        name="goodsImg"
                        valuePropName="file"
                    >
                        <Upload
                            name="file"
                            action={shopImg}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChange}
                            onPreview={handlePreview}
                            onRemove={handleDelete}
                            accept=".jpg,.png"
                            multiple={true}
                            maxCount={5}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>

                    </Form.Item>
                    <div>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}
                               name="file">
                            <img
                                alt="example"
                                style={{width: '100%'}}
                                src={previewImage}
                            />
                        </Modal>
                    </div>
                    <Form.Item label="提交">
                        <Button type="primary" htmlType="submit">确认</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
