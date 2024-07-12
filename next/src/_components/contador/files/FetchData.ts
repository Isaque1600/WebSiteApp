import { Files } from "./Columns";

type Props = {
  year: string;
  month: string;
  name: string;
};

export async function FetchData({
  year,
  month,
  name,
  ...props
}: Props): Promise<Files[]> {
  if (month == "3") {
    return [
      {
        file: "test3",
        size: 1.254,
        mTime: "24/03/2022",
      },
    ];
  }

  return [
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
    {
      file: "test",
      size: 0,
      mTime: "test",
    },
  ];
}
