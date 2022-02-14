import React from "react";
import { Row, Col } from "antd";
import { Layout } from "antd";
import { SettingsState } from "./context/settings/SettingsState";
import { Settings } from "./pages/Settings/Settings";
import { Rates } from "./pages/Rates/Rates";
import { Converter } from "./pages/Converter/Converter";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MenuBar } from "./components/Menu/MenuBar";
import classes from "./App.module.css";

const { Header, Footer, Content } = Layout;

export const LayoutComponent = () => (
  <Layout className={classes.layout}>
    <Header className={classes.header}>
      <MenuBar />
    </Header>

    <Content>
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="rates" element={<Rates />} />
        <Route path="converter" element={<Converter />} />
        <Route path="*" element={<Navigate to="/rates" />} />
      </Routes>
    </Content>
    <Footer>
      <Row gutter={0} className={classes.row}>
        <Col xs={24}>© 1995-2022 Company.com Inc.</Col>
      </Row>
    </Footer>
  </Layout>
);

const App = () => {
  return (
    <SettingsState>
      <BrowserRouter>
        <LayoutComponent />
      </BrowserRouter>
    </SettingsState>
  );
};

export default App;
