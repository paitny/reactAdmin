import {Button, Card, Table, Image} from 'antd';
import {Link,useNavigate} from "react-router-dom";
import WaresLeft from "../../components/goods/WaresLeft";
import "../../assets/scss/goodControl.scss"
import {useEffect, useState} from "react";
import {deleteShop, getShop, url, getShopPage} from "../../api/AxiosURL";

const {Column} = Table;
export default function GoodControl() {
    let [shop, setShop] = useState([]);
    let [total,setTotal]=useState(0)
    //获取子级的分类
    let [ware,setWare]=useState("默认")
    let [input,setInput]=useState()
    const navigate=useNavigate()
    useEffect(() => {
        getShop().then(({data}) => {

            setShop(data.data)
            setTotal(data.len)
        })
    }, [])
    const handleDelete =async (value) => {
     await deleteShop({id:value._id,goodsImg:value.goodsImg})
    }
    const handleRevise = (val) => {
        navigate("/home/waresAdd",{
            state:{name: "修改商品",...val}
        })
    }
    //分页器
    const handlePage=async (val,age)=>{
        // if(ware){
        //     let {data}=   await getShopPage({val:val,age:age,ware})
        //     setShop(data)
        //
        // }
        let data
        // eslint-disable-next-line
        switch (ware) {
            case "默认":
                data = await getShopPage({val:val,age:age,ware})
                setShop(data.data)
                break;
            case "分类搜索":
                data = await getShopPage({val:val,age:age,ware,input})
                break;
            case "名称搜索":
                data = await getShopPage({val:val,age:age,ware,input})
                break;
        }
        setShop(data.data)

    }


    return (
        <div>
            <Card title={<WaresLeft setShop={setShop} setTotal={setTotal} setWare={setWare} setInput={setInput}/>}
                  extra={<Button type="primary"><Link to="/home/waresAdd" state={{name: "添加商品"}}>添加商品</Link></Button>}>
                <Table dataSource={shop} rowKey="_id"
                       pagination={
                           {
                               total:total,
                               onChange:handlePage
                           }
                       }
                >
                    <Column title="分类" dataIndex="nickname"/>
                    <Column title="名称" dataIndex="nameThe"/>
                    <Column title="描述" dataIndex="text"/>
                    <Column title="价格" dataIndex="confirm"/>
                    <Column title="图片"
                            render={(r) => {
                                if(r.goodsImg.length) {
                                    return <Image width={100} height={80}
                                                  src={url + "/" + r.goodsImg[0].imgUrl}></Image>
                                }
                                return "未上传"
                            }}
                    />
                    <Column title="操作"
                            render={(r) => {
                                return <><Button type="primary" onClick={() => {
                                    handleRevise(r)
                                }}>修改</Button>&nbsp;<Button type="primary" danger onClick={() =>{ handleDelete(r)}
                                }>删除</Button></>
                            }}
                    />


                </Table>
            </Card>
        </div>
    )
}


