import { useRouter } from "next/navigation";
import { getSearchParams } from "../SearchParams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  per_page: number;
};

export default function PerPage({ per_page }: Props) {
  const params = getSearchParams("per_page");
  const router = useRouter();

  return (
    <>
      <Select
        defaultValue={per_page.toString()}
        onValueChange={(value) =>
          router.push(
            params.length > 0
              ? `?${params}&per_page=${value}`
              : `?per_page=${value}`,
          )
        }
      >
        <SelectTrigger className="w-32 border-none bg-neutral-600 text-neutral-100 shadow">
          <SelectValue placeholder={per_page.toString()} />
        </SelectTrigger>
        <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-lg">
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
          <SelectItem value="500">500</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
