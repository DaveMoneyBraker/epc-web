import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";
import { Info } from "../../components/info/Info";

const InfoPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.INFO);
  return <Info />;
};

export default InfoPage;
