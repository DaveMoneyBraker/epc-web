import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";
import { Queues } from "../../components/queues";

const QueuesPage: React.FC = (props) => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.QUEUES);

  return <Queues {...props} />;
};

export default QueuesPage;
