import {Layout} from 'antd';
import "../assets/scss/home.scss"
import SiderContent from "../components/sider/SiderContent";
import { Popconfirm} from 'antd';
import useHome from "../hooks/useHome";
import {Outlet,useLocation} from "react-router-dom";

const {Header, Footer, Sider, Content} = Layout;

export default function Home() {
    let [weat,LoginName,loginOut] = useHome({})
    let location=useLocation()
    return (
        <div className="home">
            <Layout>
                <Sider width="256">
                    <SiderContent></SiderContent>
                </Sider>
                <Layout>
                    <Header>
                        <div className="fr">
                            <span className="hellow">你好·</span>
                            <span className="color_paity">{LoginName}</span>
                            <span className="exit">
                                  <Popconfirm
                                      title="你确定要退出登录?"
                                      onConfirm={loginOut}
                                      okText="确定"
                                      cancelText="取消"
                                  >
                                <a href="#">退出</a>
                                  </Popconfirm>
                            </span>
                        </div>
                    </Header>

                        <Content >
                            <div className="display_content">
                                <p className="fl title">{location.state.name}</p>
                                <p className="fr weather">
                                    <span className="weat">{weat.country}</span>
                                    <span className="weat">{weat.city}</span>
                                    <span className="weat">{weat.update_time}</span>
                                    <span className="weat">{weat.value?.wea}</span>
                                    <span className="weat">{weat.value?.week}</span>

                                </p>
                            </div>
                            <div className="outlet">
                                <Outlet></Outlet>
                            </div>
                        </Content>

                    <Footer>

                        <div className="record">
                            <a target="_blank" rel='noreferrer' href="https://beian.miit.gov.cn">蜀ICP备2021004767号</a>
                        </div>

                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}
