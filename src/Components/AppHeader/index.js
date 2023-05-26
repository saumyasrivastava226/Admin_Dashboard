import React ,{useState,useEffect}from 'react'
import {Badge,Image, Typography,Space,Drawer, List} from "antd"
import { MailOutlined, BellFilled } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getComments, getOrders } from '../../API';
export const AppHeader = () => {
  const[comments,setComments]=useState([]);
  const[orders,setOrders]=useState([]);
  const[commentsOpen,setCommentsOpen]=useState(false);
  const[notifications,setNotifications]=useState(false);
  useEffect(()=>{
      getComments().then(res=>{
          setComments(res.comments);
      });
      getOrders().then(res=>{
        setOrders(res.products);
    });
  },[])
  return (
    <div  className='AppHeader'>
      
      <Image src="https://th.bing.com/th/id/OIP.HJ7VngeUHlrnVjzK3s9SuQHaLH?pid=ImgDet&rs=1"
              width={40}
      >
      </Image>
      <Typography.Title>Sheldon's Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} dot >
          <MailOutlined style={{fontSize:22}} onClick={()=>{
              setCommentsOpen(true);
          }}/>
        </Badge>
        <Badge count={orders.length}>
        <BellFilled style={{fontSize:22}} onClick={()=>{
              setNotifications(true);
          }}/>
        </Badge>
    </Space>
    <Drawer title="Comments" open={commentsOpen} onClose={()=>{
       setCommentsOpen(false);
    }}
    maskClosable>
      <List dataSource={comments} renderItem={(item)=>{
         return <List.Item>{item.body}</List.Item>
      }}></List>
    </Drawer>
    <Drawer title="Orders notifications" open={notifications} onClose={()=>{
       setNotifications(false);
    }}
    maskClosable>
      <List dataSource={orders} renderItem={(item)=>{
         return <List.Item> Order placed for {item.title}</List.Item>
      }}></List>
    </Drawer>
      
      </div>
    

    
  )
}
