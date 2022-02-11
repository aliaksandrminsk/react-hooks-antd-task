import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const MenuBar: React.FC = () => {
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["rates"]}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/converter" icon={<GoldOutlined />}>
        <Link to="/converter">Сonverter</Link>
      </Menu.Item>
      <Menu.Item key="/rates" icon={<AppstoreOutlined />}>
        <Link to="/rates">All rates</Link>
      </Menu.Item>
      <Menu.Item key="/settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};
