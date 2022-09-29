const  roleDate = [
    {
        title: "首页",
        key: "0-0",
        to: "/home/admin",
        icon: "HomeOutlined",
    },
    {
        title: "商品",
        key: "0-1",
        icon: "DropboxOutlined",
        children: [
            {
                title: "分类管理",
                key: "0-1-1",
                to: "/home/goodsAssort",
                icon: "BarsOutlined",
                disabled: true,
            },
            {
                title: "商品管理",
                key: "0-1-2",
                to: "/home/goodsControl",
                icon: "FireOutlined",
                disabled: true,
            },
        ],
    },
    {
        title: "用户管理",
        key: "0-2",
        to: "/home/user",
        icon: "UserOutlined",
    },
    {
        title: "角色管理",
        key: "0-3",
        to: "/home/role",
        icon: "UsergroupAddOutlined",
    },
    {
        title: "图形管理",
        key: "0-4",
        icon: "RadarChartOutlined",
        children: [
            {
                title: "柱形图",
                key: "0-4-1",
                disabled: true,
                to: "/home/cylinder",
                icon: "BarChartOutlined",
            },
            {
                title: "折线图",
                key: "0-4-2",
                disabled: true,
                to: "/home/line",
                icon: "LineChartOutlined",
            },
            {
                title: "饼图",
                key: "0-4-3",
                to: "/home/cake",
                disabled: true,
                icon: "PieChartOutlined",
            },
        ],
    },
]

export default  roleDate
