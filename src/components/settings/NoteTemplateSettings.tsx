
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Edit, Trash2 } from "lucide-react";

const NoteTemplateSettings = () => {
  const templates = [
    { id: '1', name: 'Initial Assessment', type: 'Progress Note' },
    { id: '2', name: 'Therapy Session', type: 'Progress Note' },
    { id: '3', name: 'Medication Management', type: 'Progress Note' }
  ];

  const handleAddTemplate = () => {
    toast.info("Note template creation will be implemented soon");
  };

  const handleEditTemplate = (id: string) => {
    toast.info(`Editing template ${id}`);
  };

  const handleDeleteTemplate = (id: string) => {
    toast.success(`Template ${id} deleted successfully`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Note Templates</h3>
        <Button onClick={handleAddTemplate}>
          Create Template
        </Button>
      </div>
      
      <div className="space-y-4">
        {templates.map(template => (
          <Card key={template.id}>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.type}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEditTemplate(template.id)}
                >
                  <Edit size={16} className="text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      {templates.length === 0 && (
        <div className="text-center p-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No Templates Yet</h4>
          <p className="text-muted-foreground mb-4">Create your first note template to streamline documentation</p>
          <Button onClick={handleAddTemplate}>Create Template</Button>
        </div>
      )}
    </div>
  );
};

export default NoteTemplateSettings;
