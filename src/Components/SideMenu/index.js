import React from 'react'
import { useEffect,useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import{Menu} from "antd"
import {AppstoreOutlined,ShopOutlined,ShoppingCartOutlined,UserOutlined} from "@ant-design/icons"
export const SideMenu = () => {
  const location=useLocation();
  const[selectedKeys,setSelectedKeys]=useState("/");
  useEffect(() => {
        const pathName=location.pathname;
        setSelectedKeys(pathName);

  },[location.pathname])
  const navigate=useNavigate();
  return (
    <div  className='SideMenu'>
      <Menu
       onClick={(item)=>{
           navigate(item.key);
       }}
       selectedKeys={[selectedKeys]}
        items={
          [{
             label:"Dashboard",
             icon: <AppstoreOutlined/>,
             key: '/'
           },
           {
            label:"Inventory",
            icon:<ShopOutlined/>,
            key: '/inventory'
          },
          {
            label:"Orders",
            icon:<ShoppingCartOutlined/>,
            key: '/orders'
          },
          {
            label:"Customers",
            key: '/customers',
            icon:<UserOutlined/>,
          }
        ]}
      
      >


     </Menu>
    </div>
  )
}
