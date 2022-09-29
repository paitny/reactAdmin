import {Link} from "react-router-dom";
import {
    BarChartOutlined,
    BarsOutlined,
    DropboxOutlined,
    FireOutlined,
    HomeOutlined,
    LineChartOutlined,
    PieChartOutlined,
    RadarChartOutlined,
    UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";

// 侧边栏内容设置
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

let icons={
    BarChartOutlined:<BarChartOutlined/>,
    BarsOutlined:<BarsOutlined/>,
    DropboxOutlined:<DropboxOutlined/>,
    FireOutlined:<FireOutlined/>,
    HomeOutlined:<HomeOutlined/>,
    LineChartOutlined:<LineChartOutlined/>,
    PieChartOutlined:<PieChartOutlined/>,
    RadarChartOutlined:<RadarChartOutlined/>,
    UsergroupAddOutlined:<UsergroupAddOutlined/>,
    UserOutlined:<UserOutlined/>
}
// 处理数据结构
function handleItems(arr = [],p = []){
    if(!arr.length) return [];
    arr.forEach(ele => {
        if(ele.children){  // 有存在子集
            p.push(getItem(ele.title, ele.key, icons[ele.icon], handleItems(ele.children)))
        }else{
            p.push(getItem(<Link to={ele.to} state={{ name: ele.title }}>{ele.title}</Link> ,ele.key, icons[ele.icon]))
        }
    });
    return p
}
function item({LoginAbout}) {
    return  handleItems(LoginAbout?.roleArr)

}

export default item
