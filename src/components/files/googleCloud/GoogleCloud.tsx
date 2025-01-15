import React from "react";
import { ApiRoutes } from "../../../core/router";
import {
  DefaultPageActions,
  FILTER_ITEM_TYPE,
  FilterConfig,
} from "../../../types";
import { SuppressionTypeOptions } from "../../../types/suppressions/suppressions";
import AppHooks from "../../../hooks/0_AppHooks";
import { CommonPage } from "../../2_common/page";
import { isGCloudFile } from "../../../typeGuards";
import AppMutations from "../../../services/mutations/AppMutations";

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
  const apiUrl = React.useMemo(() => ApiRoutes.GOOGLE_CLOUD, []);
  const mutation = AppMutations.useDownloadServerFileMutation(apiUrl);
  const filterConfigs: FilterConfig[] = React.useMemo(
    () => [
      { itemType: FILTER_ITEM_TYPE.STRING, itemName: "filename" },
      {
        itemType: FILTER_ITEM_TYPE.STRING,
        itemName: "gcloudId",
        selectOptions: SuppressionTypeOptions,
      },
      { itemType: FILTER_ITEM_TYPE.DATE, itemName: "createdAt" },
    ],
    []
  );
  const actions = React.useMemo<DefaultPageActions[]>(
    () => ["edit", "download", "delete"],
    []
  );

  const itemConfigs = AppHooks.useFilteredItemConfigs(filterConfigs, [
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
