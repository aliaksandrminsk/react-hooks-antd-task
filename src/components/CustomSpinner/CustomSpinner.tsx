import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import classes from "./CustomSpinner.module.css";

const antIcon = <LoadingOutlined className={classes.icon} spin />;

const CustomSpinner = () => <Spin indicator={antIcon}/>

export default CustomSpinner;
