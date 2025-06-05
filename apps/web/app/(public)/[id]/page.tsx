"use client";

import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";

export default function Page() {
  const nameId = useParams().id;
  const { data } = useAgenda({ companyNameId: nameId as string });
  console.log(data);
  return <div>Esta será una página de agenda</div>;
}
