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
import { Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface InternEdit {
  id: string;
  name: string;
  course: string;
  studentId: string;    
  company: string;
  totalHours: number;
  batchyear:string;   
}

interface Props {
  intern: InternEdit;
}

export default function Edit({ intern }: Props) {
  const [open, setOpen] = useState(false);

  const { data, setData, put, processing, recentlySuccessful  } = useForm({
     name: intern.name,
    studentid: intern.studentId,
    course: intern.course,
    company: intern.company,
    overallhours: intern.totalHours,
    batchyear: intern.batchyear,
    });

  const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault();

  put(`/interns/${intern.id}`, {
    onSuccess: () => {
    setTimeout(() => setOpen(false), 1500);
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
        <span className="cursor-pointer transition-colors">
          Edit
        </span>
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
            <div className="gap-4 pt-4">
              {recentlySuccessful && (
              <Alert className="bg-green-100 border-green-400 mt-2">
                <InfoIcon />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Student successfully edited!
                </AlertDescription>
              </Alert>
            )}
            </div>
            <FieldGroup>
              <Field className="gap-4">
                    <div className="space-y-2">
                    <Label>Batch Year:</Label>
                    <Input
                      value={data.batchyear}
                      onChange={(e) => setData("batchyear", e.target.value)}
                    />
                    </div>
                </Field>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Student Name:</Label>
                    <Input
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    </div>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label>Student ID:</Label>
                    <Input
                      value={data.studentid}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label>Course:</Label>
                    <Input
                      value={data.course}
                      onChange={(e) => setData("course", e.target.value)}
                    />
                    </div>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label>Company:</Label>
                    <Input
                      value={data.company}
                      onChange={(e) => setData("company", e.target.value)}
                    />
                    </div>

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