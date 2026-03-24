import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Download } from "lucide-react";

export default function ImportDialog() {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const { post, setData, processing } = useForm({
    file: null as File | null,
  });

  const handleFileChange = () => {
    const file = fileInput.current?.files?.[0];
    if (!file) return;

    setData("file", file);
  };

  const handleUpload = () => {
    post("/interns/import", {
      forceFormData: true,
      onSuccess: () => {
        alert("Import successful!");
      },
      onError: () => {
        alert("Import failed!");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-gray-500">
          <Download className="mr-2 h-4 w-4" />
          Import Report
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Intern Report</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileInput}
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            variant="outline"
            onClick={() => fileInput.current?.click()}
          >
            Select Excel File
          </Button>

          <Button onClick={handleUpload} disabled={processing}>
            {processing ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}