import React, { useContext, useState } from "react";
import { SettingsContext } from "../../context/settings/settingsContext";
import { Col, Divider, Radio, Row, Space, Table } from "antd";
import { Typography } from "antd";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import classes from "./Settings.module.css";

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
  } else {
    return (
      <>
        <div className={classes.title}>
          <Title level={4}>Default Currency</Title>
        </div>
        <Divider />

        <Row gutter={20}>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <div className={classes.content}>
              <Radio.Group
                onChange={(e) => setDefaultCurrency(e.target.value)}
                value={defaultCurrency}
              >
                {currencies.map((item) => (
                  <div key={item.symbol} className={classes.radio}>
                    <Radio value={item.symbol}>
                      {`${item.name} (${item.symbol})`}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </>
    );
  }
};
