import React from "react";
import { Space, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import { getInventory, getOrders } from "../../API";
import {Avatar,Rate} from "antd";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Orders</Typography.Title>
        <Table
        columns={[
          
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: " Price",
            dataIndex: "discountedPrice",
            render :(value)=>{
              return <span>${value}</span>
           }
          },

          {
            title: "Discounted Price",
            dataIndex: "price",
            render :(value)=>{
               return <span>${value}</span>
            }
           
          },
         
          
          
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
            render :(value)=>{
              return <span>${value}</span>
           }
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
      </Space>
    </div>
  );
};

export default Orders;
