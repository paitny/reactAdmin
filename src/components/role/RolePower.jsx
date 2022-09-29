import { Button, Modal,Input, Tree} from 'antd';
import {useEffect, useState} from "react";
import roleDate from "../../assets/js/roleData"
import {prowsAdd} from "../../api/AxiosURL";
export default function RoleAdd({prow,role,setRole}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
const [rolData,setRolData]=useState({roleArr:[],roleShowArr:[]})
    useEffect(()=>{
    setRolData({roleArr:[],roleShowArr:prow[0]?.roleShowArr})
        // eslint-disable-next-line
    },[prow])
    const showModal = () => {
        if(!prow.length)return

        setIsModalOpen(true);
    };
    const handleOk = async () => {
       let {data}=await prowsAdd({rolData,id:prow[0]._id})
        setRole([...role.map((item)=> item._id===data._id? data:item)])
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handCheck=(checkedKeys,e)=>{
        setRolData({roleArr:e.checkedNodes,roleShowArr:checkedKeys})
    }
    return (
        <div style={{display:"inline-block",marginLeft:"10px"}}>
            <Button type={prow.length?"primary":"dashed"} onClick={showModal}>
                设置角色权限
            </Button>
            <Modal title="角色授权" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <div>
                  <span>角色名称&nbsp;:</span>&nbsp;&nbsp;
                  <Input disabled value={prow[0]?.roleName} style={{width:"60%"}}></Input>
              </div>
                <Tree
                    checkable
                    defaultExpandAll
                    // defaultExpandedKeys={['0-0-0', '0-0-1']}
                    // defaultSelectedKeys={['0-0-0', '0-0-1']}
                    // defaultCheckedKeys={['0-0-0', '0-0-1']}
                    // onSelect={onSelect}
                    checkedKeys={rolData.roleShowArr}
                    onCheck={handCheck}
                    treeData={roleDate}
                />
            </Modal>
        </div>
    )
}
