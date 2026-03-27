import { DetailsTable } from "../details-table";
import { detailsColumns, ActivityLog } from "./column";
import { usePage } from "@inertiajs/react";

type PageProps = {
  logs: ActivityLog[];
};

export default function LogsTable() {
  const { logs } = usePage<PageProps>().props;

  return (
    <DetailsTable columns={detailsColumns} data={logs} />
  );
}