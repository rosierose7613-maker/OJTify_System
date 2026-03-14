"use client";

import { useState } from "react";
import { DataTable } from "../data-table";
import { internColumns, InternData } from "./column";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";


export default function StudentsInterns() {
  const [data] = useState<InternData[]>([
    {
      id: "1",
      name: "John Carlo Magana",
      studentId: "ID: 221820",
      company: "Hero Apps",
      role: "Web Developer Intern",
      hoursRendered: 320,
      totalHours: 450,
      completion: 64,
      docAudit: 3,
      status: "ON-TRACK",
    },
    {
      id: "2",
      name: "Aizel Joy Vasquez",
      studentId: "ID: 222218",
      company: "Hero Apps",
      role: "Web Developer Intern",
      hoursRendered: 450,
      totalHours: 480,
      completion: 92,
      docAudit: 3,
      status: "EVALUATION PENDING",
    },
    {
      id: "3",
      name: "Ysmin Rose Reantazo",
      studentId: "ID: 2021-00412",
      company: "Comp Inc.",
      role: "Editor Intern",
      hoursRendered: 60,
      totalHours: 480,
      completion: 16,
      docAudit: 1,
      status: "AT RISK",
    },
    {
      id: "4",
      name: "Toffee",
      studentId: "ID: 2021-00993",
      company: "Quantara Solutions",
      role: "Backend Intern",
      hoursRendered: 210,
      totalHours: 480,
      completion: 43,
      docAudit: 2,
      status: "ON-TRACK",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState<InternData | null>(null);

  return (
      <div className="py-6">
        <DataTable columns={internColumns(setSelectedRow)} data={data} />
      </div>
  );
}