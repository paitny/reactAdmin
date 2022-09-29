
import {useRoutes} from 'react-router-dom'
import route from './router/index'
import {useEffect} from "react";
import {checkLogin} from "./api/AxiosURL";
import {useNavigate} from "react-router-dom";
import {setSession} from "./api/session";

function App() {
    let router=useRoutes(route)
    let navigate=useNavigate()
    useEffect(()=>{
        checkLogin().then((data)=>{
           if(!data.code){
               navigate("/")
           }else {
               setSession("userInfo",data.data.data)
               navigate("/home/admin",{
                   state:{
                       name:"首页"
                   }
               })
           }
        })
        // eslint-disable-next-line
    },[])
    return (
        <div className="App">
            {router}
        </div>
    );
}

export default App;
