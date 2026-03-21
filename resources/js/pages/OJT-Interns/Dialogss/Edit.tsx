"use client";

import { useState } from "react";
import { useForm } from "@inertiajs/react";

import { Field, FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface InternEdit {
  id: string;
  name: string;
  studentId: string;    
  company: string;
  totalHours: number;   
}

interface Props {
  intern: InternEdit;
}

export default function Edit({ intern }: Props) {
  const [open, setOpen] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    name: intern.name,
    studentid: intern.studentId,
    company: intern.company,
    overallhours: intern.totalHours,
    });

  const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault();

  put(`/interns/${intern.id}`, {
    onSuccess: () => {
      setOpen(false);
    },
  });
};

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Edit
        </DropdownMenuItem>

        <DialogContent className="sm:max-w-xl">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <Separator />
              <DialogDescription>
                Edit this student here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field className="gap-4">
                <div className="space-y-2">
                  <Label>Student Name:</Label>
                  <Input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                </div>
              </Field>

              <Field className="gap-4">
                <div className="space-y-2">
                  <Label>Student ID:</Label>
                  <Input
                    value={data.studentid}
                    onChange={(e) => setData("studentid", e.target.value)}
                  />
                </div>
              </Field>

              <Field className="gap-4">
                <div className="space-y-2">
                  <Label>Company:</Label>
                  <Input
                    value={data.company}
                    onChange={(e) => setData("company", e.target.value)}
                  />
                </div>
              </Field>

              <Field className="gap-4">
                <div className="space-y-2">
                  <Label>Overall Hours:</Label>
                  <Input
                    value={data.overallhours}
                    onChange={(e) =>
                      setData("overallhours", Number(e.target.value))
                    }
                  />
                </div>
              </Field>
            </FieldGroup>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700"
              >
                {processing ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}