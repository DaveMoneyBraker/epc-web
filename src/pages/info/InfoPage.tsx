import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { Info } from "../../components/info/Info";

const InfoPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.INFO);
  return <Info />;
};

export default InfoPage;
