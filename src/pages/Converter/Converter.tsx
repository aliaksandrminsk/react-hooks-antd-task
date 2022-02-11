import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../context/settings/settingsContext";
import { Input, Select, Space } from "antd";
import { SettingsState } from "../context/settings/SettingsState";
import { LoadingOutlined } from "@ant-design/icons";
import { Typography, Divider } from "antd";
import CustomSpinner from "../components/spinners/CustomSpinner";

export const Converter = () => {
  const { getRate, currencies, defaultCurrency, isSettingsJsonLoaded } =
    useContext(SettingsContext);
  const { Option } = Select;
  const { Title } = Typography;

  const [fromValue, setFromValue] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toValue, setToValue] = useState<number>(1);
  const [toCurrency, setToCurrency] = useState<string>();

  const getSecondCurrency = (firstCurrency: string) => {
    for (const currency of currencies) {
      if (currency.symbol !== firstCurrency) {
        return currency.symbol;
      }
    }
    return firstCurrency;
  };

  useEffect(() => {
    if (isSettingsJsonLoaded) {
      setFromCurrency(defaultCurrency);
      setToCurrency(getSecondCurrency(defaultCurrency));
    }
  }, [isSettingsJsonLoaded]);

  useEffect(() => {
    if (isSettingsJsonLoaded && toCurrency && fromCurrency) {
      getRate(fromValue, fromCurrency, toCurrency).then((data) =>
        setToValue(data)
      );
    }
  }, [fromValue, toCurrency, fromCurrency]);

  if (!isSettingsJsonLoaded) {
    return <CustomSpinner />;
  }

  return (
    <div>
      <Title level={4}>Convert</Title>
      <Divider />

      <Space>
        <Input
          value={fromValue}
          onChange={(e) => setFromValue(+e.target.value)}
          style={{ width: "100px" }}
        />
        <Select
          className="select-after"
          onChange={setFromCurrency}
          value={fromCurrency}
          style={{ width: "80px" }}
        >
          {currencies.map((item) => (
            <Option key={item.symbol} value={item.symbol}>
              {item.symbol}
            </Option>
          ))}
        </Select>
        = {toValue}
        <Select
          className="select-after"
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
  );
};
