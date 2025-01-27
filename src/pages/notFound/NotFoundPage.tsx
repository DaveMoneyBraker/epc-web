import React from "react";
import APP_HOOKS from "../../hooks/0_AppHooks";
import APP_CONSTANTS from "../../constants/AppConstants";
import NotFound from "../../components/notFound/NotFound";

const NotFoundPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.NOT_FOUND);

  return <NotFound />;
};

export default NotFoundPage;
