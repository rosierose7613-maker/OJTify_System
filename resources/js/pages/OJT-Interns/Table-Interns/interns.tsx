"use client";

import { useState } from "react";
import { DataTable } from "../data-table";
import { internColumns, InternData } from "./column";

type InternRaw = {
  id: number;
  name: string;
  studentid: string;
  company: string;
  overallhours: number;
  renderedhours: number;
};

interface StudentsInternsProps {
  interns: InternRaw[];
}

export default function StudentsInterns({ interns }: StudentsInternsProps) {

  const formattedData: InternData[] = interns.map((item) => {
    const completion = Math.floor((item.renderedhours / item.overallhours) * 100);

    let docAudit = 1;
    if (completion > 75) docAudit = 4;
    else if (completion > 50) docAudit = 3;
    else if (completion > 25) docAudit = 2;

    let status: "ON-TRACK" | "EVALUATION PENDING" | "AT RISK";
    if (completion >= 80) status = "ON-TRACK";
    else if (completion >= 50) status = "EVALUATION PENDING";
    else status = "AT RISK";

    return {
      id: item.id.toString(),
      name: item.name,
      studentId: item.studentid,
      company: item.company,
      role: "Intern",
      hoursRendered: item.renderedhours,
      totalHours: item.overallhours,
      completion,
      docAudit,
      status,
    };

  });

  const [selectedRow, setSelectedRow] = useState<InternData | null>(null);

  return (
    <div>
      <DataTable columns={internColumns(setSelectedRow)} data={formattedData} />
    </div>

  );
}