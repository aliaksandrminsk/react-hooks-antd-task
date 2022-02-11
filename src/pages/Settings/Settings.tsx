import React, { useContext } from "react";
import { SettingsContext } from "../context/settings/settingsContext";
import { Col, Divider, Radio, Row, Space } from "antd";
import { Typography } from "antd";
import CustomSpinner from "../components/spinners/CustomSpinner";

export const Settings = () => {
  const {
    currencies,
    defaultCurrency,
    isSettingsJsonLoaded,
    setDefaultCurrency,
  } = useContext(SettingsContext);
  const { Title } = Typography;

  if (!isSettingsJsonLoaded) {
    return <CustomSpinner />;
  }

  const style = { background: "#0092ff", padding: "8px 0" };
  return (
    <div>
      <Title level={4}>Settings</Title>
      <Divider />
      <Radio.Group
        onChange={(e) => setDefaultCurrency(e.target.value)}
        value={defaultCurrency}
      >
        <Row gutter={20}>
          {currencies.map((item) => (
            <Col className="gutter-row" span={24}>
              <div style={style}>
                <Radio key={item.symbol} value={item.symbol}>
                  {item.name}
                </Radio>
              </div>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </div>
  );
};
