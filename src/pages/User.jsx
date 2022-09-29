import {Card, Table, Button} from 'antd';
import UserAdd from "../components/users/UserAdd";
import {useEffect, useState} from "react";
import {getUser, getUserPage, UserRemove} from "../api/AxiosURL";

const {Column} = Table
export default function User() {
    let [user, setUser] = useState([])
    let [useLen,setUserLen]=useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [modify,setModify]=useState({})
    useEffect(() => {
        getUser().then(({data}) => {
            setUser(data.data)
            setUserLen(data.len)
        })
    }, [])
    const handleAlterUser=(r)=>{
        setModify(r)
        setIsModalOpen(true);
    }
    const handleDeleteUser=async (r)=>{
   await UserRemove({id:r._id})
        setUser([...user.filter((item)=>item._id!==r._id)])
        console.log(r)
    }
    const handleChangePage=(num,age)=>{
        getUserPage({num,age}).then((data)=>{
            setUser(data.data)
        })
    }
    return (
        <div>
            <Card title={<UserAdd modify={modify} setModify={setModify} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} setUser={setUser}></UserAdd>}>
                <Table dataSource={user} rowKey="_id"
                pagination={{total:useLen,
                onChange:handleChangePage
                }}
                >

                    <Column title="用户名" dataIndex="LoginName" key="age"/>
                    <Column title="创建时间" dataIndex="LoginTime"/>
                    <Column title="手机号" dataIndex="LoginPhone"/>
                    <Column title="角色" dataIndex={["LoginAbout", "roleName"]}/>
                    <Column title="操作"
                            render={(r) => {
                                return <>
                                    <Button type="primary" onClick={()=>{handleAlterUser(r)}} >修改</Button>
                                    <Button type="primary" onClick={()=>{handleDeleteUser(r)}} style={{marginLeft:"10px"}}>删除</Button>
                                </>
                            }}
                    />
                </Table>
            </Card>
        </div>
    )
}
