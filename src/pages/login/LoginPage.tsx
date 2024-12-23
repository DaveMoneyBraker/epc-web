import React from "react";
import { Login } from "../../components/login";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";

const LoginPage: React.FC = (props) => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.LOGIN);

  return <Login {...props} />;
};

export default LoginPage;
