import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/settings/settingsContext";
import { Col, InputNumber, Row, Select, Space } from "antd";
import { Typography, Divider } from "antd";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import classes from "./Converter.module.css";

export const Converter = () => {
  const { getRate, currencies, defaultCurrency, isSettingsJsonLoaded } =
    useContext(SettingsContext);
  const { Option } = Select;
  const { Title } = Typography;

  const [fromValue, setFromValue] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toValue, setToValue] = useState<number>(1);
  const [toCurrency, setToCurrency] = useState<string>();

  useEffect(() => {
    function getSecondCurrency(firstCurrency: string) {
      for (const currency of currencies) {
        if (currency.symbol !== firstCurrency) {
          return currency.symbol;
        }
      }
      return firstCurrency;
    }

    if (isSettingsJsonLoaded) {
      setFromCurrency(defaultCurrency);
      setToCurrency(getSecondCurrency(defaultCurrency));
    }
  }, [isSettingsJsonLoaded, defaultCurrency, currencies]);

  useEffect(() => {
    if (isSettingsJsonLoaded && toCurrency && fromCurrency) {
      getRate(fromValue, fromCurrency, toCurrency).then((data) => {
        if (data != null) setToValue(data);
      });
    }
  }, [isSettingsJsonLoaded, getRate, fromValue, toCurrency, fromCurrency]);

  if (!isSettingsJsonLoaded) {
    return (
      <div className={classes.spinner}>
        <CustomSpinner />
      </div>
    );
  } else {
    return (
      <>
        <div className={classes.title}>
          <Title level={4}>Currency Converter</Title>
        </div>
        <Divider />
        <Row gutter={20}>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <div className={classes.content}>
              <Space>
                <InputNumber
                  value={fromValue}
                  controls={false}
                  onChange={setFromValue}
                  className={classes.input}
                />
                <Select
                  className={"select-after " + classes.select}
                  onChange={setFromCurrency}
                  value={fromCurrency}
                >
                  {currencies.map((item) => (
                    <Option key={item.symbol} value={item.symbol}>
                      {item.symbol}
                    </Option>
                  ))}
                </Select>
                = {toValue}
                <Select
                  className={"select-after " + classes.select}
                  onChange={setToCurrency}
                  value={toCurrency}
                  style={{ width: "80px" }}
                >
                  {currencies.map((item) => (
                    <Option key={item.symbol} value={item.symbol}>
                      {item.symbol}
                    </Option>
                  ))}
                </Select>
              </Space>
            </div>
          </Col>
        </Row>
      </>
    );
  }
};
