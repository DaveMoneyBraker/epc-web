import React from "react";
import { DefaultPageActions } from "../../../types";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import { isGCloudFile } from "../../../typeGuards";
import AppMutations from "../../../services/mutations/AppMutations";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const GoogleCloudFile: React.FC = () => {
  const configs = APP_HOOKS.usePageItemConfig({
    itemConfigs: [
      {
        key: "filename",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
      {
        key: "bucket",
        skipFilter: true,
      },
      {
        key: "assignment",
        skipFilter: true,
      },
      {
        key: "contentType",
        skipFilter: true,
      },
      {
        key: "size",
        skipFilter: true,
      },
      {
        key: "gcloudId",
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
      },
    ],
  });

  const apiUrl = React.useMemo(() => APP_CONSTANTS.API_ROUTES.GOOGLE_CLOUD, []);
  const mutation = AppMutations.useDownloadServerFileMutation(apiUrl);

  const defaultActions = APP_HOOKS.useDefaultPageActions();
  const actions = React.useMemo<DefaultPageActions[]>(
    () =>
      defaultActions.filter(
        (action) => action !== APP_CONSTANTS.PAGE_ACTIONS.CREATE
      ),
    [defaultActions]
  );

  const handleEvent = React.useCallback(
    (action: DefaultPageActions, file: unknown) => {
      if (
        isGCloudFile(file) &&
        action === APP_CONSTANTS.PAGE_ACTIONS.DOWNLOAD
      ) {
        const { id, filename } = file;
        mutation.mutate({ id, filename });
      }
    },
    [mutation]
  );

  return (
    <CommonPage
      itemName="file"
      actions={actions}
      onEvent={handleEvent}
      {...configs}
    />
  );
};
