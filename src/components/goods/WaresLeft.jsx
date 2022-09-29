import React, {useRef, useState} from 'react';
import {Select, Input, Button} from 'antd';
import {searchShop} from "../../api/AxiosURL";

const {Option} = Select;
export default function WaresLeft({setShop,setTotal,setWare,setInput}) {
    let [val, setVal] = useState(null)
    const inputVal = useRef()
    const handleChange = (value) => {
        setVal(value)
        setWare(value)
    };
    const handleSearch = async () => {
        let data
        // eslint-disable-next-line
        switch (val) {
            case "默认":
                data= await searchShop({age: 1})
                break;
            case "分类搜索":
                data = await searchShop({name: inputVal.current.input.value})
                break;
            case "名称搜索":
                data= await searchShop({title: inputVal.current.input.value})
                break;
        }
        setShop(data.data.data)
        setTotal(data.data.len)
        setInput(inputVal.current.input.value)

    }
    return (
        <div style={{width: 250}}>
            <Select defaultValue="默认" style={{width: 150}} onChange={handleChange}>
                <Option value="默认">默认</Option>
                <Option value="分类搜索">分类搜索</Option>
                <Option value="名称搜索">名称搜索</Option>
            </Select>
            <Input ref={inputVal}></Input>
            <Button type="primary" onClick={handleSearch}>搜索</Button>
        </div>
    )
}
