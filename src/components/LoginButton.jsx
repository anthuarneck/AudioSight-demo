import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
    const loginUrl = 'https://accounts.spotify.com/authorize?response_type=code&client_id=8b34a109eb1244189620da8eba0cafd8&redirect_uri=https://whimsical-cranachan-684729.netlify.app/success';

  return <Link to={loginUrl}>Login</Link>;
};

export default LoginButton;
