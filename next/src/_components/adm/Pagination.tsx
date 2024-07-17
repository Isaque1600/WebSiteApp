import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSearchParams } from "../SearchParams";

type Props = {
  pages: number[];
  page: number;
};

export default function Pagination({ pages, page }: Props) {
  const location = usePathname();
  const canPreviousPage = page > 1;
  const canNextPage = page < pages.length;
  const totalPages = pages.length;
  const params = getSearchParams();

  return (
    <div className="mt-2 flex select-none items-center space-x-4 text-xl text-neutral-100">
      {canPreviousPage && (
        <>
          <Link
            href={`${location}${params.length > 0 ? `?${params}&page=1` : "?page=1"}`}
            className="rounded-md px-2 py-1 hover:bg-neutral-800 hover:bg-opacity-70"
          >
            &laquo;
          </Link>
          <Link
            href={`${location}${params.length > 0 ? `?${params}&page=${page - 1}` : `?page=${page - 1}`}`}
            className="rounded-md px-2 py-1 hover:bg-neutral-800 hover:bg-opacity-70"
          >
            &lsaquo;
          </Link>
        </>
      )}

      {pages.map((key) => {
        return (
          <Link
            key={key}
            href={`${location}${params.length > 0 ? `?${params}&page=${key}` : `?page=${key}`}`}
            data-page={page === key}
            className="rounded-md px-2 py-1 hover:bg-neutral-800 hover:bg-opacity-70 data-[page=true]:font-bold"
          >
            {key < 10 ? `0${key}` : key}
          </Link>
        );
      })}

      {canNextPage && (
        <>
          <Link
            href={`${location}${params.length > 0 ? `?${params}&page=${page + 1}` : `?page=${page + 1}`}`}
            className="rounded-md px-2 py-1 hover:bg-neutral-800 hover:bg-opacity-70"
          >
            &rsaquo;
          </Link>
          <Link
            href={`${location}${params.length > 0 ? `?${params}&page=${totalPages}` : `?page=${totalPages}`}`}
            className="rounded-md px-2 py-1 hover:bg-neutral-800 hover:bg-opacity-70"
          >
            &raquo;
          </Link>
        </>
      )}
    </div>
  );
}
