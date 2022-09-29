
import { Button, Modal } from 'antd';
import {useState} from "react";

import { Input } from 'antd';
import {goodsAdd} from "../../api/AxiosURL";

export default function GoodsAdd({arr,setArr}) {
    let valAccount=null
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
     let {data}=  await goodsAdd({valAccount})
        console.log(data)
        setArr([data,...arr])
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange=(e)=>{
    valAccount=e.target.value
    }
    return (
        <div>
            <Button type="primary" onClick={showModal}>添加分类</Button>
            <Modal title="添加分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <Input onChange={handleChange}></Input>
            </Modal>
        </div>
    )}
