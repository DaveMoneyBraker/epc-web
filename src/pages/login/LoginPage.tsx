import React from "react";
import { Login } from "../../components/login";
import APP_CONSTANTS from "../../constants/0_AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";

const LoginPage: React.FC = (props) => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.LOGIN);

  return <Login {...props} />;
};

export default LoginPage;
