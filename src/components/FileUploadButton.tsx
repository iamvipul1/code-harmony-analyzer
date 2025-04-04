
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploadButtonProps {
  onFileUpload: (content: string) => void;
  accept?: string;
  buttonText?: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileUpload,
  accept = '.py',
  buttonText = 'Upload File'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.py')) {
      toast.error('Please upload a Python (.py) file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
      toast.success(`File "${file.name}" uploaded successfully`);
    };
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    reader.readAsText(file);

    // Reset input so the same file can be uploaded again
    event.target.value = '';
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleClick}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
    </>
  );
};

export default FileUploadButton;
