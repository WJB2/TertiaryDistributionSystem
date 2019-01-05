import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, routerRedux,Link } from 'dva/router';
import InitializingLayout from './InitializingLayout';
import MainLoginLayout from './MainLoginLayout';
import {LOGO } from './../../../utils/GlobalConst';
import menuConfig from './../../../config/menuConfig';
import {
  Layout, Menu, Breadcrumb, Icon,Button,Popconfirm
} from 'antd';
import global from "../../../models/global";

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

@connect(models => ({
  globalModal: models.global,
}))
class MainLayout extends PureComponent {

  constructor(props){
    super(props);
    this.state={
      collapsed: false,
    }
  }

  componentWillMount(){
    const menuTreeNode = this.renderMenu(menuConfig.menuRoute);

    this.setState({
      menuTreeNode,
    })
  }

  // 菜单渲染
  renderMenu =(data)=>{
    return data.map((item)=>{
      if(item.submenu){
        return (
          <SubMenu title={<div><Icon type={item.icon} /><span>{item.message}</span></div>} key={item.key} >
            { this.renderMenu(item.submenu)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.message} key={item.key} onClick={()=>this.handleClickMenu(item.path)}>
        <Icon type={item.icon}></Icon>
        <span>{item.message}</span>
      </Menu.Item>
    })
  }

  handleClickMenu(e){
    console.log(e);
     const {dispatch}=this.props;
     dispatch({
       type:'global/forwardDestroy',
       payload:{
        path:e,
       }
     })
  }

  componentDidMount(){
    this.setState({

    })
  }

  handleLogout(){
    localStorage.clear();
    window.location.reload(true);
  }

  toggle=()=>{
    this.setState({
      collapsed:!this.state.collapsed,
    })
  }

  renderMain() {
    const { dispatch, globalModal, routerData } = this.props;

    const {
      authenticated,
    } = globalModal;

    console.log(authenticated);
    console.log(routerData);

    return (
      <div style={{ width: '100%', height: '100%' }}>

        {!authenticated ? <MainLoginLayout dispatch={dispatch} global={global} /> : null}

        <Layout style={{ minHeight: '100vh' }}>

          <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
          >
            <Header style={{ background: '#3455E7', padding: 0 ,display:'flex',justifyContent:'center',alignItems:'center'}} >
              <div style={{fontSize:this.state.collapsed?'10px':'30px',fontWeight:'900',color:'#fff'}}>{LOGO}</div>
            </Header>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {this.state.menuTreeNode}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#F2CC45', padding: 0 ,position:'relative'}} >
            <Icon
              style={{fontSize:'20px',marginLeft:'20px'}}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}>
            </Icon>
            <Popconfirm  title={"确认退出吗？"} okText="确定" cancelText="取消" onConfirm={()=>this.handleLogout()}>
              <Button style={{color:'black',position:'absolute',right:'100px',top:'2vh'}} >退出</Button>
            </Popconfirm>
            </Header>
            <Content style={{ margin: '0 16px' }}>

              {
                Object.keys(routerData)
                  .map(path => {
                    return (
                      <Route
                        key={path}
                        path={path}
                        exact
                        component={routerData[path].component}
                      />
                    );
                  })
              }

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <div>Copyright  2009-2018 亿业联盟科技 版权所有 All Rights Reserved. </div>
            </Footer>
          </Layout>
        </Layout>

      </div>
    );
  }

  render() {
    const { globalModal } = this.props;

    return globalModal.initialized ? this.renderMain() : <InitializingLayout />;
  }
}

export default MainLayout;
