import { Typography } from "antd";
import React from "react";

type Props = {};

const Header = () => {
  return (
    <div>
      <Typography.Title
        level={4}
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        Salary Analysis Dashboard
      </Typography.Title>
    </div>
  );
};

export default Header;
