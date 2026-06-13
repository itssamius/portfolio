import React, { useContext } from "react";
import Link from "next/link";
import light from "../../assets/image/png/logo-light-lc.png";
import dark from "../../assets/image/png/logo-dark-lc.png";
import { Title } from "../Core";

import GlobalContext from "../../context/GlobalContext";
import { Image } from "react-bootstrap";

const Logo = ({ color = "front", height, className = "", ...rest }) => {
  const gContext = useContext(GlobalContext);
  const isDark = gContext.theme.headerDark;

  return (
    <Link href="/">
      <a className={`${className}`} {...rest}>
        <Image
            src={isDark ? light : dark}
            alt="Samuel Abera Logo"
            layout="intrinsic"
            height="30px"
            width="auto"
        />
      </a>
    </Link>
  );
};

export default Logo;
