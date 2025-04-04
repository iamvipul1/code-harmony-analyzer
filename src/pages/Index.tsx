import React, { useState } from 'react';
import { FileDown, FileUp, Github, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CodeEditor from '@/components/CodeEditor';
import ThemeToggle from '@/components/ThemeToggle';
import SampleCodeDropdown from '@/components/SampleCodeDropdown';
import FileUploadButton from '@/components/FileUploadButton';
import ResultSection from '@/components/ResultSection';
import { sampleCodes } from '@/data/sampleCodes';
import { compareCodes } from '@/services/apiService';
import { toast } from 'sonner';

const Index = () => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<{
    similarityScore: number;
    textSummary: string | null;
  }>({
    similarityScore: 0,
    textSummary: null
  });

  const handleCompare = async () => {
    if (!code1.trim() || !code2.trim()) {
      toast.error('Please enter code in both editors before comparing');
      return;
    }

    setIsLoading(true);
    try {
      const result = await compareCodes(code1, code2);
      setComparisonResult({
        similarityScore: result.similarityScore,
        textSummary: result.textSummary
      });
      toast.success('Code comparison completed');
    } catch (error) {
      console.error('Error comparing code:', error);
      toast.error('Error comparing code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode1('');
    setCode2('');
    setComparisonResult({
      similarityScore: 0,
      textSummary: null
    });
    toast.info('Editors cleared');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Code Harmony Analyzer</h1>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <Github className="h-4 w-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Left column: Code editors */}
          <div className="space-y-6 md:col-span-2 lg:col-span-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Original Code</h2>
              <div className="flex gap-2">
                <SampleCodeDropdown 
                  onSelect={setCode1} 
                  sampleCodes={sampleCodes} 
                />
                <FileUploadButton onFileUpload={setCode1} />
              </div>
              <CodeEditor 
                value={code1} 
                onChange={setCode1} 
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Modified Code</h2>
              <div className="flex gap-2">
                <SampleCodeDropdown 
                  onSelect={setCode2} 
                  sampleCodes={sampleCodes} 
                />
                <FileUploadButton onFileUpload={setCode2} />
              </div>
              <CodeEditor 
                value={code2} 
                onChange={setCode2} 
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleCompare} 
                disabled={isLoading || !code1.trim() || !code2.trim()} 
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Compare Code'
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClear}
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Center separator for desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <Separator orientation="vertical" className="mx-auto h-full" />
          </div>

          {/* Mobile separator */}
          <div className="md:hidden">
            <Separator className="my-4" />
          </div>

          {/* Right column: Results */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
                <ResultSection 
                  similarityScore={comparisonResult.similarityScore}
                  textSummary={comparisonResult.textSummary}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Code Harmony Analyzer. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, Tailwind CSS, and ShadCN UI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
