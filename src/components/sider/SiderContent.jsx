
import {Menu} from 'antd'
import {useEffect, useState} from "react";
import item from "../../hooks/useSider";
import {getSession} from "../../api/session";
export default function SiderContent() {
    const [keys,setKeys]=useState()
    useEffect(()=>{
        setKeys(item(getSession("userInfo")))
    },[])
    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={keys}
            />
        </div>
    );
}
