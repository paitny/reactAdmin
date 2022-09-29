import {useEffect, useMemo, useState} from "react";
import {exitLogin, weather} from "../api/AxiosURL";
import {clearSession, getSession} from "../api/session";
import {useNavigate} from "react-router-dom";
export default function useHome() {
    let [weat, setWeat] = useState({})
    const navigate=useNavigate()
    useEffect(() => {
        weather().then(({data}) => {

            setWeat(data)
        })
    }, [])
    let LoginName = useMemo(() => getSession("userInfo").LoginName, [])
    const loginOut=()=>{
        exitLogin()
        clearSession()
        navigate("/")
    }
    // if(!LoginName){
    //     navigate("/")
    //     clearSession()
    // }
    return [weat,LoginName,loginOut]
}
