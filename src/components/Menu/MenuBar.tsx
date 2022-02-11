import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useLocation } from "react-router-dom";

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
        <NavLink to="/converter">Сonverter</NavLink>
      </Menu.Item>
      <Menu.Item key="/rates" icon={<AppstoreOutlined />}>
        <NavLink to="/rates">All rates</NavLink>
      </Menu.Item>
      <Menu.Item key="/settings" icon={<SettingOutlined />}>
        <NavLink to="/settings">Settings</NavLink>
      </Menu.Item>
    </Menu>
  );
};
