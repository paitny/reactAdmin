import createAxios from "./Axios"
// 请求配置默认值
export let url = 'http://localhost:7709';


// login组件 请求登录数据
export const login = (data) => createAxios("POST", url+"/login/submit",data);
//获取天气
export const weather = () => createAxios("GET", url+"/get/weather");
//检查登录
export const checkLogin=(data)=>createAxios("POST", url+"/login/check",data);
//退出登录
export const exitLogin=()=>createAxios("GET", url+"/login/out");
//添加分类
export const goodsAdd=(data)=>createAxios("POST", url+"/goods/add",data);
//获取所有的分类
export const getGoods=()=>createAxios("GET", url+"/get/goods");
//获取分页page
export const getAccPage=(data)=>createAxios("GET", url+"/get/accPage",data);
//修改分类名
export const AccUpdate=(data)=>createAxios("POST", url+"/goods/update",data);
//删除分类
export const AccDelete=(data)=>createAxios("POST", url+"/goods/Delete",data);

//上传商品图片
export const shopImg=url+"/goods/Img"
//添加商品

export const shopAdd=(data)=>createAxios("POST", url+"/goods/shopAdd",data);
//删除商品图片
export const shopImgRemove=(data)=>createAxios("POST", url+"/goods/imgRemove",data);
//获取商品
export const getShop=()=>createAxios("GET", url+"/get/shop");

//删除商品

export const deleteShop=(data)=>createAxios("POST", url+"/goods/shopDelete",data);


//搜索商品
export const searchShop=(data)=>createAxios("GET", url+"/get/search",data);
//商品分页获取
export const getShopPage=(data)=>createAxios("GET", url+"/get/shopPage",data);
//添加角色
export const roleAdd=(data)=>createAxios("POST", url+"/roles/add",data);

//获取角色
export const getRole=()=>createAxios("GET", url+"/get/roles");
//删除角色
export const deleteRole=(data)=>createAxios("POST", url+"/roles/delete",data);
//添加角色权限
export const prowsAdd=(data)=>createAxios("POST", url+"/roles/prowsAdd",data);
//获取所有角色
export const getRolesAll=()=>createAxios("GET", url+"/get/rolesAll");
//添加用户
export const userAdd=(data)=>createAxios("POST", url+"/Login/Add",data);
//获取用户
export const getUser=()=>createAxios("GET", url+"/get/user");
//获取用户分页
export const getUserPage=(data)=>createAxios("GET", url+"/get/userPage",data);
//删除用户
export const UserRemove=(data)=>createAxios("POST", url+"/login/remove",data);
//修改用户
export const UserAmend=(data)=>createAxios("POST", url+"/login/amend",data);
