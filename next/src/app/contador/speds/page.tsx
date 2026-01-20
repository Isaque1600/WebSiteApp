"use client";
import { columns, Files } from "@/_components/contador/files/Columns";
import { DataTable } from "@/_components/contador/files/data-table";
import { Header } from "@/_components/contador/Header";
import { TableParameters } from "@/_components/contador/TableParameters";
import { Utilities } from "@/_components/contador/Utilities";
import { Separator } from "@/_components/ui/separator";
import { useFile } from "@/hooks/Files/useFiles";
import { Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Loader2, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Speds() {
  const [displayDownload, setDisplayDownload] = useState(false);
  const [itensSelected, setItensSelected] = useState([]);
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [name, setName] = useState("null");

  const { getSpeds, downloadFile, downloadMultipleFiles } = useFile();

  const {
    mutateAsync: downloadMultiple,
    isPending: isDownloadingMultiple,
    isSuccess: isDownloadMultipleSuccess,
    isError: isDownloadMultipleError,
  } = downloadMultipleFiles;

  const {
    mutateAsync: download,
    isSuccess: isDownloadSuccess,
    isError: isDownloadError,
  } = downloadFile;

  const {
    data: speds,
    isLoading: isSpedsLoading,
    isError: isSpedsError,
    error: spedsError,
  } = getSpeds({
    year: year,
    month: month,
    client: name,
  });

  useEffect(() => {
    if (isDownloadMultipleSuccess || isDownloadSuccess) {
      toast.success("Download iniciado!");
    }

    if (isDownloadError || isDownloadMultipleError) {
      toast.error("Erro ao iniciar o download!");
    }
  }, [
    isDownloadMultipleSuccess,
    isDownloadSuccess,
    isDownloadError,
    isDownloadMultipleError,
  ]);

  return (
    <>
      <Header className="w-full justify-between" pageName="SPEDS">
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
          pageItems={speds?.data?.length || 0}
          selectedItens={itensSelected.length}
        />
        <Separator
          orientation="horizontal"
          className="mb-4 mt-0 w-full bg-gray-300"
        />
        {isSpedsLoading ? (
          <Loader2 className="m-auto size-auto animate-spin" />
        ) : isSpedsError ? (
          <div>
            {(spedsError as AxiosError).status == 400 ? (
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
            data={speds.data || []}
            setDisplayDownload={setDisplayDownload}
            setItensSelected={setItensSelected}
            onFilenameClick={(value: Files) => {
              download(value.url);
            }}
          />
        )}
      </div>
    </>
  );
}
