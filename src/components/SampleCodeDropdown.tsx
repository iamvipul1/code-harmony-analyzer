
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface SampleCodeDropdownProps {
  onSelect: (code: string) => void;
  sampleCodes: { [key: string]: string };
}

const SampleCodeDropdown: React.FC<SampleCodeDropdownProps> = ({ 
  onSelect, 
  sampleCodes 
}) => {
  const handleSelectChange = (value: string) => {
    if (value && sampleCodes[value]) {
      onSelect(sampleCodes[value]);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select sample code" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(sampleCodes).map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SampleCodeDropdown;
