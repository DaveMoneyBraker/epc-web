import React from "react";
import AppHooks from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/AppConstants";

const NotFoundPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.NOT_FOUND);

  return <>page not found</>;
};

export default NotFoundPage;
