import React from "react";
import AppHooks from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import NotFound from "../../components/notFound/NotFound";

const NotFoundPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.NOT_FOUND);

  return <NotFound />;
};

export default NotFoundPage;
