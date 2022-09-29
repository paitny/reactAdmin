import {Card, Table, Tag} from 'antd';
import RoleAdd from "../components/role/RoleAdd"
import RolePower from "../components/role/RolePower"
import {useEffect, useState} from "react";
import {deleteRole, getRole} from "../api/AxiosURL";

const {Column}=Table
export default function Role() {
    let [role,setRole]=useState([])
    let [Ra,setRa]=useState([])
    let [prow,setProw]=useState([])
    let [len,setLen]=useState()
    useEffect(()=>{
       getRole().then(({data})=>{
           setRole(data.data)
           setLen(data.len)
       })
    },[])

    const removeRole= (r)=>{
        return async ()=>{
            console.log(r)
           deleteRole({id:r._id})
          setRole([...role.filter((item)=>item._id!==r._id)])
        }
    }
    return (
        <div>
            <div className="site-card-border-less-wrapper">
                <Card title={<>
                    <RoleAdd setRole={setRole} role={role}></RoleAdd>
                    <RolePower prow={prow} role={role} setRole={setRole}></RolePower>
                </>} bordered={false}>
                    <Table dataSource={role} rowKey="_id"
                           pagination={{total:len,hideOnSinglePage:true}}
                           rowSelection={{
                               type: "radio",
                               onChange:(selectedRowKeys, selectedRows)=>{
                                   setProw(selectedRows)
                                   setRa(selectedRowKeys)
                           },
                               selectedRowKeys:Ra
                           }}
                           onRow={(record)=>{
                               return{
                                   onClick:event=>{
                                       console.log(record)
                                       setProw([record])
                                       setRa([record._id])
                                   }
                               }
                           }}
                    >
                        <Column title="角色名称" dataIndex="roleName"/>
                        <Column title="授权时间" dataIndex="roleTime"/>
                        <Column title="授权人" dataIndex="roleAbout"/>
                        <Column title="操作"
                        render={(r)=>{
                            return <Tag color={"pink"} onClick={removeRole(r)}>删除</Tag>
                        }}
                        />
                    </Table>
                </Card>
            </div>
        </div>
    )
}
