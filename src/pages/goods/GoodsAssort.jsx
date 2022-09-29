import React, {useEffect, useRef, useState} from 'react';
import {Card} from 'antd';
import "../../assets/scss/goodsAssort.scss"
import GoodsAdd from "../../components/goods/GoodsAdd"
import {getAccPage, AccUpdate, getGoods, AccDelete} from "../../api/AxiosURL";
import {Table, Tag, Popconfirm, Input} from 'antd';
import "../../assets/scss/account.scss"

const {Column} = Table;
let len = 0


export default function GoodsAssort() {
    let inputVal = useRef()
    let [arr, setArr] = useState([])
    useEffect(() => {
        getGoods().then(({data}) => {
            len = data.length
            setArr(data)
        })
    }, [])
    const confirm = async (val) => {
        let result = inputVal.current.input.value
        console.log(val)
        if (result === "") return
        if (val.accountName === result) return
        let {data} = await AccUpdate({id: val._id, result})
        let res = data[0]
        let rest = arr.filter((item) => item._id !== res._id)
        setArr([res, ...rest])
    }

    const handPage = async (val) => {
        let data = await getAccPage({current: val.current, pageSize: val.pageSize})
        setArr(data.data)
    }
    //删除分类
    const handDelete = async (val) => {
        let rest = arr.filter((item) => item._id !== val._id)
        setArr([...rest])
        await AccDelete({id: val._id})
    }
    return (
        <div className="goodsAssort">
            <Card size="small" title="一级分类" extra={<GoodsAdd arr={arr} setArr={setArr}></GoodsAdd>}>
                <Table
                    dataSource={arr}
                    rowKey={record => record._id}
                    pagination={{total: len}}
                    onChange={handPage}
                >

                    <Column title="分类商品" dataIndex="accountName"/>
                    <Column title="操作"
                            render={(_, val) => {
                                return <>
                                    <Tag color="blue">
                                        <Popconfirm
                                            title={(<>
                                                <div>修改分类:</div>
                                                <Input ref={inputVal}></Input></>)}
                                            onConfirm={confirm.bind(null, val)}
                                            okText="确认" cancelText="取消">
                                            修改分类名
                                        </Popconfirm>
                                    </Tag>
                                    <Tag color="red">
                                        <Popconfirm title="是否删除" onConfirm={handDelete.bind(null, val)}>
                                            删除分类
                                        </Popconfirm>

                                    </Tag>
                                </>


                            }}
                    />

                </Table>
            </Card>
        </div>
    )
}
