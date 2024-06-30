/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  const location: any = useLocation();

  useEffect(() => {
    document.title = title;
  }, [title, location]);

  return null;
}
