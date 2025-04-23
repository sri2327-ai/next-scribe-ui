
import React, { useState, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, ArrowDownAZ, ArrowUpAZ, Upload, File, X, Scan } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientDocumentsProps {
  patient: {
    name: string;
  };
}

const documents = [
  {
    id: 1,
    name: "Medical Records Release.pdf",
    type: "PDF",
    date: "Apr 20, 2025",
    size: "1.2 MB",
    category: "Consent Forms"
  },
  {
    id: 2,
    name: "Lab Results - March 2025.pdf",
    type: "PDF",
    date: "Mar 27, 2025",
    size: "3.5 MB",
    category: "Lab Results"
  },
  {
    id: 3,
    name: "Treatment Plan - Q2 2025.docx",
    type: "DOCX",
    date: "Mar 15, 2025",
    size: "645 KB",
    category: "Treatment Plans"
  },
  {
    id: 4,
    name: "Insurance Card - Front.jpg",
    type: "JPG",
    date: "Feb 10, 2025",
    size: "856 KB",
    category: "Insurance"
  },
  {
    id: 5,
    name: "Insurance Card - Back.jpg",
    type: "JPG",
    date: "Feb 10, 2025",
    size: "712 KB",
    category: "Insurance"
  },
  {
    id: 6,
    name: "Medication History.pdf",
    type: "PDF",
    date: "Jan 22, 2025",
    size: "2.1 MB",
    category: "Medications"
  }
];

const PatientDocuments: React.FC<PatientDocumentsProps> = ({ patient }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadTab, setUploadTab] = useState<string>("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documentsList, setDocumentsList] = useState(documents);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredDocuments = documentsList
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const simulateUpload = () => {
    if (selectedFiles.length === 0 || !selectedCategory) {
      toast.error("Please select files and category before uploading");
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate completion after some time
    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setUploadProgress(100);
      
      // Add the uploaded files to the documents list
      const newDocs = selectedFiles.map((file, index) => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        });
        
        return {
          id: Math.max(...documentsList.map(d => d.id)) + 1 + index,
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
          date: formattedDate,
          size: formatFileSize(file.size),
          category: selectedCategory
        };
      });
      
      setDocumentsList(prev => [...newDocs, ...prev]);
      setSelectedFiles([]);
      setSelectedCategory("");
      setUploadDialogOpen(false);
      toast.success(`${newDocs.length} file(s) uploaded successfully`);
    }, 2000);
  };

  const simulateScan = () => {
    if (!selectedCategory) {
      toast.error("Please select a category before scanning");
      return;
    }
    
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate completion after some time
    setTimeout(() => {
      clearInterval(interval);
      setScanning(false);
      setScanProgress(100);
      
      // Add the scanned document to the documents list
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      
      const newDoc = {
        id: Math.max(...documentsList.map(d => d.id)) + 1,
        name: `Scanned Document - ${formattedDate}.pdf`,
        type: "PDF",
        date: formattedDate,
        size: "1.8 MB",
        category: selectedCategory
      };
      
      setDocumentsList(prev => [newDoc, ...prev]);
      setSelectedCategory("");
      setScanDialogOpen(false);
      toast.success("Document scanned successfully");
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Patient Documents</h3>
        <div className="flex gap-2">
          <Button 
            onClick={() => setScanDialogOpen(true)} 
            className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
          >
            <Scan size={16} />
            Scan Document
          </Button>
          <Button 
            onClick={() => setUploadDialogOpen(true)} 
            className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload size={16} />
            Upload Document
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            className="pl-8 h-9"
            placeholder="Filter documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleSortOrder}
          className="gap-1"
        >
          {sortOrder === "asc" ? (
            <>
              <ArrowUpAZ size={16} />
              <span>Oldest</span>
            </>
          ) : (
            <>
              <ArrowDownAZ size={16} />
              <span>Newest</span>
            </>
          )}
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        setDocumentsList(prev => prev.filter(d => d.id !== doc.id));
                        toast.success("Document deleted");
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No documents found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Document Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consent Forms">Consent Forms</SelectItem>
                  <SelectItem value="Lab Results">Lab Results</SelectItem>
                  <SelectItem value="Treatment Plans">Treatment Plans</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Medications">Medications</SelectItem>
                  <SelectItem value="Medical Records">Medical Records</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelection}
                style={{ display: 'none' }}
                multiple
              />
              
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed rounded-md p-6 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Click to select files or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, JPG, PNG</p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="border rounded-md overflow-y-auto max-h-36">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <File size={16} className="text-gray-500" />
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Uploading...</Label>
                  <span className="text-xs text-gray-500">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={simulateUpload}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={uploading || selectedFiles.length === 0 || !selectedCategory}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Scan Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="scan-category">Document Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consent Forms">Consent Forms</SelectItem>
                  <SelectItem value="Lab Results">Lab Results</SelectItem>
                  <SelectItem value="Treatment Plans">Treatment Plans</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Medications">Medications</SelectItem>
                  <SelectItem value="Medical Records">Medical Records</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border rounded-md p-6 bg-gray-50">
              {!scanning ? (
                <div className="flex flex-col items-center">
                  <Scan size={64} className="text-gray-400 mb-4" />
                  <p className="text-center text-gray-600">
                    Place your document on the scanner and click the Scan button
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Scanning document...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <p className="text-sm text-center text-gray-500">
                    Please don't move the document while scanning
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setScanDialogOpen(false)}
              disabled={scanning}
            >
              Cancel
            </Button>
            <Button
              onClick={simulateScan}
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={scanning || !selectedCategory}
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDocuments;
