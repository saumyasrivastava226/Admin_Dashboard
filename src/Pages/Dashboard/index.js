import { Card, Space, Statistic, Typography } from "antd";
import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getOrders, getRevenue } from "../../API/index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const[orders,setOrders]=useState(0);
  const[inventory,setInventory]=useState(0);
  const[revenue,setRevenue]=useState(0);
  const[customers,setCustomers]=useState(0);
  useEffect(()=>{
     getOrders().then(res=>
       {
           setOrders(res.total);
           setRevenue(res.discountedTotal);
       }
     )
     getRevenue().then(res=>
      {
          setRevenue(res.total);
      }
    )

  },[])
  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icons={
              <ShoppingCartOutlined
                style={{
                  fontSize: 24,
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.5)",
                }}
              />
            }
            title={"Orders"}
            value={orders}
          />
          <DashboardCard
            icons={
              <ShoppingOutlined
                style={{
                  fontSize: 24,
                  color: "blue",
                  backgroundColor: "rgba(0,255,255,0.5)",
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
          />
          <DashboardCard
            icons={
              <UserOutlined
                style={{
                  fontSize: 24,
                  color: "black",
                  backgroundColor: "rgba(123,213,122,0.5)",
                }}
              />
            }
            title={"Customers"}
            value={customers}
          />
          <DashboardCard
            icons={
              <DollarCircleOutlined
                style={{
                  fontSize: 24,
                  color: "magenta",
                  backgroundColor: "rgba(255,210,123,0.5)",
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
};
function DashboardCard({ icons, title, value }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icons}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setLoading(false);
      setDataSource(res.products.splice(0, 3));
    });
  }, []);
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },

          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });
      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 9, 12, 0.5)",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{width:500,height:350}}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}
export default Dashboard;
