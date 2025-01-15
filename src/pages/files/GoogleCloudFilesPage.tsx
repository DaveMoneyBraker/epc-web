import React from "react";
import APP_CONSTANTS from "../../constants/AppConstants";
import AppHooks from "../../hooks/0_AppHooks";
import { GoogleCloudFile } from "../../components/files/googleCloud";

const GoogleCloudFilesPage: React.FC = () => {
  AppHooks.useEPCDocumentTitle(APP_CONSTANTS.PAGE_TITLES.GOOGLE_CLOUD);
  return <GoogleCloudFile />;
};

export default GoogleCloudFilesPage;
