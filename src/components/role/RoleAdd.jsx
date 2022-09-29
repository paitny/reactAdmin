import { Button, Modal,Input } from 'antd';
import {useRef, useState} from "react";
import {roleAdd} from "../../api/AxiosURL";

export default function RoleAdd({role,setRole}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
const inputVal=useRef()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        let value =inputVal.current.input.value
        if(!value)return
        if(value){
          let {data}=await roleAdd({role:value})
            setRole([data,...role])
            inputVal.current.input.value=""
            setIsModalOpen(false)
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div style={{display:"inline-block"}}>
            <Button type="primary" onClick={showModal} >
                添加角色
            </Button>
            <Modal title="添加角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Input ref={inputVal}></Input>
            </Modal>
        </div>
    )
}
