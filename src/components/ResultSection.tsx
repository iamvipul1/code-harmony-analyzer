
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SimilarityScore from './SimilarityScore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResultSectionProps {
  similarityScore: number;
  astImage1: string | null;
  astImage2: string | null;
  diffImage: string | null;
  textSummary: string | null;
  onDownloadReport: () => void;
  isLoading: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  similarityScore,
  astImage1,
  astImage2,
  diffImage,
  textSummary,
  onDownloadReport,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-muted h-32 w-32"></div>
        </div>
        <div className="animate-pulse h-4 bg-muted rounded w-28 mt-4"></div>
        <div className="animate-pulse h-2 bg-muted rounded w-48 mt-2"></div>
        <div className="animate-pulse h-48 bg-muted rounded w-full mt-6"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center p-4">
        <SimilarityScore score={similarityScore} />
        <Button 
          onClick={onDownloadReport} 
          className="mt-6"
          disabled={similarityScore === 0 || !diffImage}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
      </div>

      {(astImage1 || astImage2 || diffImage) && (
        <Tabs defaultValue="diff" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="diff">Differences</TabsTrigger>
            <TabsTrigger value="ast1">AST Tree 1</TabsTrigger>
            <TabsTrigger value="ast2">AST Tree 2</TabsTrigger>
          </TabsList>
          <TabsContent value="diff" className="animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Code Differences</CardTitle>
                <CardDescription>
                  Highlighting added, removed, and modified code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {diffImage ? (
                  <div className="max-h-[500px] overflow-auto border rounded-md">
                    {/* Use direct base64 data URL if that's what we're receiving */}
                    <img 
                      src={diffImage.startsWith('data:') ? diffImage : `data:image/png;base64,${diffImage}`} 
                      alt="Code differences" 
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    Compare code to see differences
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ast1" className="animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>AST Tree - Code 1</CardTitle>
                <CardDescription>
                  Abstract Syntax Tree visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                {astImage1 ? (
                  <div className="max-h-[500px] overflow-auto border rounded-md">
                    <img 
                      src={astImage1.startsWith('data:') ? astImage1 : `data:image/png;base64,${astImage1}`} 
                      alt="AST Tree for code 1" 
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    Compare code to see AST tree
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ast2" className="animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>AST Tree - Code 2</CardTitle>
                <CardDescription>
                  Abstract Syntax Tree visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                {astImage2 ? (
                  <div className="max-h-[500px] overflow-auto border rounded-md">
                    <img 
                      src={astImage2.startsWith('data:') ? astImage2 : `data:image/png;base64,${astImage2}`} 
                      alt="AST Tree for code 2" 
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    Compare code to see AST tree
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {textSummary && (
        <Card>
          <CardHeader>
            <CardTitle>Change Summary</CardTitle>
            <CardDescription>
              Summary of code differences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-md bg-secondary text-secondary-foreground whitespace-pre-wrap font-mono text-sm">
              {textSummary}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultSection;
