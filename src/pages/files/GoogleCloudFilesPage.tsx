import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import APP_HOOKS from "../../hooks/0_AppHooks";
import { GoogleCloudFile } from "../../components/files/googleCloud";

const GoogleCloudFilesPage: React.FC = () => {
  APP_HOOKS.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.GOOGLE_CLOUD);
  return <GoogleCloudFile />;
};

export default GoogleCloudFilesPage;
