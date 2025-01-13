"use client";
import {
  Card,
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Flex,
  message,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  EditTwoTone,
  DeleteTwoTone,
  UsergroupAddOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Api } from "@/utils/Api";
import moment from "moment";

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = ({userId}:{userId: string}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const api = new Api();


  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const data = await api.users.getById(id);
      console.log(data);
      if (!data) {
        throw new Error();
      }
      setData(data);
    } catch (error) {
      console.log(error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

 

  const handleLogout = () => {
    // Implement logout logic here
    message.success('You have logged out successfully!');
    router.replace("/")
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `${"ACCESS_TOKEN"}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

  useEffect(() => {
    
    
        fetchData(userId);
      
    
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };


  







  const renderContent = () => {
    switch (selectedMenuItem) {
      default:
        return (
          <Card
            loading={loading}
            className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center items-center"
          >
            <p className="text-2xl">Name - {data?.name || ""}</p>
            <p className="text-2xl">Email - {data?.email || ""}</p>
          </Card>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <div className="h-16 bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-lg font-bold">
            {collapsed ? "DB" : "Dashboard"}
          </h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          
         
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <button onClick={handleLogout}>Logout</button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-md flex justify-between items-center px-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-gray-600">
            Welcome -{" "}
            <span className="font-bold text-lg text-pink-500">
              {data?.name.slice(0, 1).toUpperCase() +
                data?.name.slice(1)}
            </span>
          </div>
        </Header>
        <Content className="p-6 bg-green-200">{renderContent()}</Content>
        <Footer className="text-center text-gray-600 bg-white">
          © 2024 Dashboard. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
