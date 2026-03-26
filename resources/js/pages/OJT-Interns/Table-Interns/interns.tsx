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
  batchyear: string;
};

interface StudentsInternsProps {
  interns: InternRaw[];
  batchYears: string[];
}

export default function StudentsInterns({ interns }: StudentsInternsProps) {
  
  
  const formattedData: InternData[] = interns.map((item: any) => {
    return {
      id: item.id.toString(),
      name: item.name,
      studentId: item.studentId ?? item.studentid,
      company: item.company,
      role: "Intern",
      hoursRendered: item.hoursRendered,
      totalHours: item.totalHours,
      completion: item.completion,
      docAudit: item.docAudit,
      totalDocs: item.totalDocs,
      status: item.status,
      batchyear: item.batchyear,
    };
  });
  
    const batchYears = Array.from(
      new Set(
        formattedData
          .map(i => i.batchyear)
          .filter(Boolean)
          .map(i => i.trim())
      )
    );
  const [selectedRow, setSelectedRow] = useState<InternData | null>(null);

  return (
    <div>
    <DataTable 
      columns={internColumns(setSelectedRow)} 
      data={formattedData} 
      batchYears={batchYears} 
    />    
    </div>

  );
}