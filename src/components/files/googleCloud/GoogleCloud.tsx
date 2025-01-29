import React from "react";
import { DefaultPageActions, FilterConfig } from "../../../types";
import APP_HOOKS from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import { isGCloudFile } from "../../../typeGuards";
import AppMutations from "../../../services/mutations/AppMutations";
import APP_CONSTANTS from "../../../constants/0_AppConstants";

export const GoogleCloudFile: React.FC = () => {
  const cols = React.useMemo(
    () => [
      "filename",
      "bucket",
      "assignment",
      "contentType",
      "size",
      "gcloudId",
      "updatedAt",
      "createdAt",
      "actions",
    ],
    []
  );
  const queryKey = React.useMemo(() => "GCloudFiles", []);
  const apiUrl = React.useMemo(() => APP_CONSTANTS.API_ROUTES.GOOGLE_CLOUD, []);
  const mutation = AppMutations.useDownloadServerFileMutation(apiUrl);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING, itemName: "filename" },
      {
        itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.STRING,
        itemName: "gcloudId",
        selectOptions: APP_CONSTANTS.SUPPRESSIONS_TYPE_OPTIONS,
      },
      { itemType: APP_CONSTANTS.FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );
  const actions = React.useMemo<DefaultPageActions[]>(
    () => ["edit", "download", "delete"],
    []
  );

  const itemConfigs = APP_HOOKS.useFilteredItemConfigs(filterConfigs, [
    "gcloudId",
  ]);

  const handleEvent = React.useCallback(
    (action: DefaultPageActions, file: unknown) => {
      if (isGCloudFile(file) && action === "download") {
        const { id, filename } = file;
        mutation.mutate({ id, filename });
      }
    },
    [mutation]
  );

  return (
    <CommonPage
      itemName="email"
      cols={cols}
      actions={actions}
      queryKey={queryKey}
      apiUrl={apiUrl}
      filterConfigs={filterConfigs}
      itemConfigs={itemConfigs}
      onEvent={handleEvent}
    />
  );
};
