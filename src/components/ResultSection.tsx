
import React from 'react';
import SimilarityScore from './SimilarityScore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultSectionProps {
  similarityScore: number;
  textSummary: string | null;
  isLoading: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  similarityScore,
  textSummary,
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
      </div>

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
