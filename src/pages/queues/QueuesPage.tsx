import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { Queues } from "../../components/queues";

const QueuesPage: React.FC = (props) => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.QUEUES);

  return <Queues {...props} />;
};

export default QueuesPage;
