import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {Separator} from '@/components/ui/separator';
import { router } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { UploadCloud, Download } from "lucide-react";

export default function ImportDialog() {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const { post, setData, processing, progress } = useForm({
    file: null as File | null,
  });

  const handleFileChange = (file: File) => {
    setData("file", file);
    setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

    const handleUpload = () => {
      post("/interns/import", {
        forceFormData: true,

        onSuccess: () => {
          setFileName("");
          setData("file", null);

          if (fileInput.current) {
            fileInput.current.value = "";
          }

          router.reload({ only: ["interns", "stats"] });
        },
      });
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button 
        variant="outline" 
        className="text-gray-500"
        > 
        <Download className="h-4 w-4" 
        /> 
          Import Report 
      </Button>      
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload the report</DialogTitle>
          <Separator/>
          <DialogDescription>
            Make sure the file format is .xls or .xlsx
          </DialogDescription>
        </DialogHeader>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
            ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
          onClick={() => fileInput.current?.click()}
        >
          <UploadCloud className="mx-auto h-10 w-10 text-gray-500 mb-2" />

          <p className="font-medium">
            {fileName ? fileName : "Drag & Drop"}
          </p>

          <p className="text-sm text-gray-500">
            or click to choose a file
          </p>

          {processing && (
            <p className="text-blue-600 mt-2 text-sm">
              Uploading... {progress?.percentage ?? 0}%
            </p>
          )}
        </div>

        <input
          type="file"
          ref={fileInput}
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />

        <Button
          onClick={handleUpload}
          disabled={processing || !fileName}
          className="w-full"
        >
          {processing ? "Uploading..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}