
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, Trash2, File, FilePlus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface DocumentType {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface PatientDocumentsProps {
  patient: {
    name: string;
  };
}

const PatientDocuments: React.FC<PatientDocumentsProps> = ({ patient }) => {
  const [documents, setDocuments] = useState<DocumentType[]>([
    { id: 1, name: "Medical History Summary", type: "PDF", date: "2025-04-15", size: "1.2 MB" },
    { id: 2, name: "Latest Lab Results", type: "PDF", date: "2025-04-10", size: "750 KB" },
    { id: 3, name: "Insurance Card", type: "Image", date: "2025-03-22", size: "2.3 MB" }
  ]);
  
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    name: '',
    type: 'medical-record',
    file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadDetails({ 
        ...uploadDetails, 
        name: file.name,
        file: file 
      });
    }
  };

  const handleUpload = () => {
    if (!uploadDetails.file) {
      toast.error("Please select a file to upload");
      return;
    }

    // Simulate file upload
    toast.success("Document uploaded successfully");
    
    // Add the new document to the list
    const newDocument = {
      id: Date.now(),
      name: uploadDetails.name,
      type: uploadDetails.file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      size: `${(uploadDetails.file.size / (1024 * 1024)).toFixed(1)} MB`
    };
    
    setDocuments([newDocument, ...documents]);
    setIsUploadDialogOpen(false);
    setUploadDetails({ name: '', type: 'medical-record', file: null });
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  const documentTypeOptions = [
    { value: 'medical-record', label: 'Medical Record' },
    { value: 'lab-result', label: 'Lab Result' },
    { value: 'insurance', label: 'Insurance Document' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'imaging', label: 'Imaging/X-Ray' },
    { value: 'consent', label: 'Consent Form' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patient Documents</h2>
        <Button 
          onClick={() => setIsUploadDialogOpen(true)} 
          className="flex items-center gap-2"
        >
          <FilePlus className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-500">No documents found</p>
            <p className="text-gray-400 mb-6">Upload documents for this patient</p>
            <Button 
              onClick={() => setIsUploadDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 py-3 px-4 flex flex-row justify-between items-center space-y-0">
                <CardTitle className="text-sm font-medium flex items-center">
                  <File className="h-4 w-4 mr-2" />
                  {doc.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-gray-500">
                    <span>Type:</span>
                    <span className="font-medium">{doc.type}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Date:</span>
                    <span>{doc.date}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Size:</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={uploadDetails.name}
                onChange={(e) => setUploadDetails({ ...uploadDetails, name: e.target.value })}
                placeholder="Enter document name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-type">Document Type</Label>
              <Select 
                value={uploadDetails.type} 
                onValueChange={(value) => setUploadDetails({ ...uploadDetails, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-file">Select File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium mb-1">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500 mb-3">PDF, JPG, PNG (max 10MB)</p>
                  <Input
                    id="document-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('document-file')?.click()}
                  >
                    Browse Files
                  </Button>
                  {uploadDetails.file && (
                    <p className="text-xs text-green-600 mt-2">
                      {uploadDetails.file.name} ({(uploadDetails.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload}>Upload Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDocuments;
