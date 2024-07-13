"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { columns, Files } from "./files/Columns";
import { DataTable } from "./files/data-table";
import { FetchData } from "./files/FetchData";
import { Header } from "./Header";
import { TableParameters } from "./TableParameters";
import { Utilities } from "./Utilities";

type Props = {
  page?: string;
};

export function Content({ page }: Props) {
  const [displayDownload, setDisplayDownload] = useState(false);
  const [pageItens, setPageItens] = useState(0);
  const [itensSelected, setItensSelected] = useState([]);
  const [year, setYear] = useState("null");
  const [month, setMonth] = useState("null");
  const [name, setName] = useState("null");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([] as Files[]);

  useEffect(() => {
    setLoading(true);

    FetchData({ year: year, month: month, name: name })
      .then((response) => {
        console.log(year, month, name);
        setRows(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [year, month, name]);

  useEffect(() => {
    setPageItens(rows.length);
  }, [rows]);

  return (
    <>
      <Header className="w-full justify-between">
        {page != "certificados" ? (
          <TableParameters
            setMonth={setMonth}
            setYear={setYear}
            setName={setName}
          />
        ) : null}
      </Header>
      <div className="h-full overflow-hidden rounded-lg bg-neutral-100 shadow-md shadow-neutral-400">
        <Utilities
          downloadBtn={displayDownload}
          onClick={() => {
            itensSelected.forEach((item: object) => {
              console.log(item);
            });
          }}
          pageItems={pageItens}
          selectedItens={itensSelected.length}
        />
        <Separator
          orientation="horizontal"
          className="mb-4 mt-0 w-full bg-gray-300"
        />
        {loading ? (
          <Loader2 className="m-auto size-auto animate-spin" />
        ) : (
          <DataTable
            columns={columns}
            data={rows}
            setDisplayDownload={setDisplayDownload}
            setItensSelected={setItensSelected}
          />
        )}
      </div>
    </>
  );
}
