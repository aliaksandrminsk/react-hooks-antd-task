import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/settings/settingsContext";
import { Table, Row, Col, Divider, Image, Typography } from "antd";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import { ICurrency } from "../../context/settings/interfaces/ICurrency";
import classes from "./Rates.module.css";

interface ITableItem extends ICurrency {
  key: string;
  rate: string;
}

export const Rates = () => {
  const { Title } = Typography;

  const { currencies, getAllRates, defaultCurrency, isSettingsJsonLoaded } =
    useContext(SettingsContext);
  const [rates, setRates] = useState<Record<string, number>>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isSettingsJsonLoaded) {
      getAllRates()
        .then((data: any) => {
          setRates(data);
        })
        .catch(function (error: string) {
          setError(error);
          console.error(error);
        });
    }
  }, [isSettingsJsonLoaded]);

  const dataSource = [];
  for (const currency of currencies) {
    let rateText = null;
    if (rates != null && rates[currency.symbol])
      rateText = `1 ${currency.symbol} = ${
        Math.round((1 / rates[currency.symbol]) * 100) / 100
      } ${defaultCurrency}`;

    dataSource.push({
      key: currency.symbol,
      state: currency.state,
      name: currency.name,
      symbol: currency.symbol,
      icon: currency.icon,
      rate: rateText ?? "",
    });
  }

  const columns = [
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a: ITableItem, b: ITableItem) => a.state.localeCompare(b.state),
    },
    {
      title: "Currency",
      dataIndex: "name",
      key: "name",
      sorter: (a: ITableItem, b: ITableItem) => a.name.localeCompare(b.name),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Flag",
      dataIndex: "icon",
      key: "icon",
      render: (image: string) => (
        <Image preview={false} src={"/flags/" + image} alt="flag" />
      ),
    },
  ];

  if (!isSettingsJsonLoaded) {
    return <CustomSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <>
        <div className={classes.title}>
          <Title level={4}>Rates</Title>
        </div>
        <Divider />
        <Row gutter={20}>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{
                pageSize: 10,
              }}
            />
            ;
          </Col>
        </Row>
      </>
    );
  }
};
