"use client";
import { columns, Files } from "@/_components/contador/files/Columns";
import { DataTable } from "@/_components/contador/files/data-table";
import { Header } from "@/_components/contador/Header";
import { Utilities } from "@/_components/contador/Utilities";
import { Separator } from "@/_components/ui/separator";
import { useFile } from "@/hooks/Files/useFiles";
import { useAuth } from "@/hooks/useAuth";
import { Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { Loader2, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Certificados() {
  const [displayDownload, setDisplayDownload] = useState(false);
  const [itensSelected, setItensSelected] = useState([]);
  const [selectedContadorId, setSelectedContadorId] = useState<number | null>(
    null,
  );

  const { me } = useAuth();
  const { data: user } = me();
  const { getCertificates, downloadFile, downloadMultipleFiles } = useFile();

  // Initialize selectedContadorId based on user type
  useEffect(() => {
    if (user) {
      if (user.type === "contador") {
        setSelectedContadorId(user.id);
      }
    }
  }, [user]);

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
    data: certificates,
    isLoading: isCertificatesLoading,
    isError: isCertificatesError,
    error: certificatesError,
  } = getCertificates(selectedContadorId || 0);

  const handleContadorChange = (contadorId: number | null) => {
    setSelectedContadorId(contadorId);
  };

  useEffect(() => {
    if (!isDownloadError || !isDownloadMultipleError) {
      return;
    }
    toast.error("Erro ao iniciar o download!");
  }, [isDownloadError, isDownloadMultipleError]);

  return (
    <>
      <Header
        className="w-full justify-between"
        pageName="Certificados"
        onContadorChange={handleContadorChange}
      />
      <div className="h-full overflow-hidden rounded-lg bg-neutral-100 shadow-md shadow-neutral-400">
        <Utilities
          downloadBtn={displayDownload}
          onClick={() =>
            downloadMultiple(
              itensSelected.map((item: Row<Files>) => item.original.url),
            )
          }
          loading={isDownloadingMultiple}
          pageItems={certificates?.data?.length || 0}
          selectedItens={itensSelected.length}
        />
        <Separator
          orientation="horizontal"
          className="mb-4 mt-0 w-full bg-gray-300"
        />
        {isCertificatesLoading ? (
          <Loader2 className="m-auto size-auto animate-spin" />
        ) : isCertificatesError ? (
          <div>
            {(certificatesError as AxiosError).status == 400 ? (
              <div className="flex h-96 flex-col items-center justify-center">
                <SearchX className="size-40 text-red-650" />
                <span className="text-3xl text-red-650">
                  Nenhum certificado encontrado
                </span>
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center">
                <SearchX className="size-40 text-red-650" />
                <span className="text-3xl text-red-650">
                  Erro ao buscar certificados
                </span>
              </div>
            )}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={certificates.data || []}
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
