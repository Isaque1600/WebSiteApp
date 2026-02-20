"use client";
import { columns, Files } from "@/_components/contador/files/Columns";
import { DataTable } from "@/_components/contador/files/data-table";
import { Header } from "@/_components/contador/Header";
import { TableParameters } from "@/_components/contador/TableParameters";
import { Utilities } from "@/_components/contador/Utilities";
import { Separator } from "@/_components/ui/separator";
import { useFile } from "@/hooks/Files/useFiles";
import { ContadorContext } from "@/providers/ContadorProvider";
import { Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Loader2, SearchX } from "lucide-react";
import { useContext, useState } from "react";

export default function Cliente() {
  const { selectedContadorId } = useContext(ContadorContext);

  const [displayDownload, setDisplayDownload] = useState(false);
  const [itensSelected, setItensSelected] = useState([]);
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [name, setName] = useState("null");

  const { getArchives, downloadFile, downloadMultipleFiles } = useFile();

  const { mutateAsync: downloadMultiple, isPending: isDownloadingMultiple } =
    downloadMultipleFiles;

  const { mutateAsync: download, isPending: isDownloading } = downloadFile;

  const {
    data: archives,
    isLoading: isArchivesLoading,
    isError: isArchivesError,
    error: archivesError,
  } = getArchives({
    year: year,
    month: month,
    client: name,
    userId: selectedContadorId || 0,
  });

  return (
    <>
      <Header className="w-full justify-between">
        <TableParameters
          setMonth={setMonth}
          setYear={setYear}
          setName={setName}
        />
      </Header>
      <div className="h-full overflow-hidden rounded-lg bg-neutral-100 shadow-md shadow-neutral-400">
        <Utilities
          downloadBtn={displayDownload}
          onClick={() =>
            downloadMultiple(
              itensSelected.map((item: Row<Files>) => item.original.url),
            )
          }
          loading={isDownloadingMultiple}
          pageItems={archives?.data?.length || 0}
          selectedItens={itensSelected.length}
        />
        <Separator
          orientation="horizontal"
          className="mb-4 mt-0 w-full bg-gray-300"
        />
        {isArchivesLoading ? (
          <Loader2 className="m-auto size-auto animate-spin" />
        ) : isArchivesError ? (
          <div>
            {(archivesError as AxiosError).status == 404 ||
            (archivesError as AxiosError).status == 400 ? (
              <div className="flex h-96 flex-col items-center justify-center">
                <SearchX className="size-40 text-red-650" />
                <span className="text-3xl text-red-650">
                  Nenhum arquivo encontrado
                </span>
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center">
                <SearchX className="size-40 text-red-650" />
                <span className="text-3xl text-red-650">
                  Erro ao buscar arquivos
                </span>
              </div>
            )}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={archives.data || []}
            setDisplayDownload={setDisplayDownload}
            setItensSelected={setItensSelected}
            onFilenameClick={(value: Files) => {
              if (!isDownloading) {
                download(value.url);
              }
            }}
          />
        )}
      </div>
    </>
  );
}
