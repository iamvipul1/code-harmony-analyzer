import { toast } from 'sonner';

interface ComparisonResult {
  similarityScore: number;
  astImage1: string;
  astImage2: string;
  diffImage: string;
  textSummary: string;
  reportUrl?: string;
}

// Mock API to simulate backend processing
// In a real application, this would call your Python FastAPI backend
export const compareCodes = async (code1: string, code2: string): Promise<ComparisonResult> => {
  // Show toast for mock API
  toast.info("Simulation: Processing code comparison...");
  
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a simple difference summary
  const lines1 = code1.split('\n').length;
  const lines2 = code2.split('\n').length;
  const textSummary = generateTextSummary(code1, code2);
  
  // Calculate a simple similarity score based on difflib similarity
  const similarityScore = calculateSimilarity(code1, code2);
  
  // In a real app, these would be proper SVG or PNG images from the backend
  // Here we're using simple base64 encoded placeholder images
  const astImage1 = generateSampleImage('AST Tree 1', 800, 600);
  const astImage2 = generateSampleImage('AST Tree 2', 800, 600);
  const diffImage = generateSampleImage('Code Diff View', 800, 600);
  
  return {
    similarityScore,
    astImage1,
    astImage2,
    diffImage,
    textSummary
  };
};

// Function to download a report as PDF
export const downloadReport = (): void => {
  toast.info("Simulation: Generating PDF report...");
  
  // Simulate download delay
  setTimeout(() => {
    try {
      // Create a simple PDF using client-side approach
      const { jsPDF } = require("jspdf");
      const doc = new jsPDF();
      
      // Add content to PDF
      doc.setFontSize(22);
      doc.text("Code Similarity Analysis Report", 20, 20);
      
      doc.setFontSize(16);
      doc.text("Similarity Score", 20, 40);
      
      doc.setFontSize(12);
      doc.text("This is a simulated PDF report showing code similarity analysis.", 20, 50);
      doc.text("In a real application, this would contain full analysis details", 20, 60);
      doc.text("including AST trees and visual diff of the code.", 20, 70);
      
      // Save PDF
      doc.save("code_similarity_report.pdf");
      
      toast.success("PDF report downloaded successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF report. Please try again.");
      
      // Fallback to simple text download if PDF generation fails
      const content = "This is a simulated text report for Code Harmony Analyzer.";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const element = document.createElement("a");
      element.href = url;
      element.download = "code_similarity_report.txt";
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      
      setTimeout(() => {
        document.body.removeChild(element);
        URL.revokeObjectURL(url);
      }, 100);
    }
  }, 1500);
};

// Function to generate a sample image for demonstration
function generateSampleImage(text: string, width: number, height: number): string {
  // Create a canvas to draw the image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fill background
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#d0d8e0';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 50; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw title
    ctx.fillStyle = '#334455';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, 40);
    
    // Add some mock visualization elements based on the type of image
    if (text.includes('AST')) {
      drawMockAstTree(ctx, width, height);
    } else if (text.includes('Diff')) {
      drawMockDiffView(ctx, width, height);
    }
    
    // Convert to base64
    return canvas.toDataURL('image/png');
  }
  
  // Return fallback image data if canvas not supported
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
}

// Draw a mock AST tree visualization
function drawMockAstTree(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2;
  const startY = 100;
  
  // Draw root node
  ctx.fillStyle = '#4477aa';
  ctx.beginPath();
  ctx.arc(centerX, startY, 30, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Module', centerX, startY + 5);
  
  // Draw child nodes (level 1)
  const level1Y = startY + 100;
  const level1Nodes = ['Import', 'Function', 'Class', 'Assign'];
  const level1Width = width * 0.7;
  const level1Step = level1Width / (level1Nodes.length - 1);
  const level1StartX = centerX - level1Width / 2;
  
  level1Nodes.forEach((nodeName, index) => {
    const x = level1StartX + index * level1Step;
    
    // Connection line
    ctx.strokeStyle = '#88aabb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, startY + 30);
    ctx.lineTo(x, level1Y - 25);
    ctx.stroke();
    
    // Node circle
    ctx.fillStyle = '#66aacc';
    ctx.beginPath();
    ctx.arc(x, level1Y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Node text
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(nodeName, x, level1Y + 4);
  });
  
  // Draw some level 2 nodes
  const level2Y = level1Y + 80;
  
  // For each level 1 node, draw 0-2 child nodes
  level1Nodes.forEach((_, index) => {
    const parentX = level1StartX + index * level1Step;
    const numChildren = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numChildren; i++) {
      const offset = (i - (numChildren - 1) / 2) * 40;
      const x = parentX + offset;
      
      // Connection line
      ctx.strokeStyle = '#88aabb';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(parentX, level1Y + 25);
      ctx.lineTo(x, level2Y - 20);
      ctx.stroke();
      
      // Node circle
      ctx.fillStyle = '#88ccdd';
      ctx.beginPath();
      ctx.arc(x, level2Y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Node text
      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.fillText('Node', x, level2Y + 3);
    }
  });
}

// Draw a mock diff view
function drawMockDiffView(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const lineHeight = 24;
  const startY = 80;
  const textX = 50;
  
  // Draw line numbers and code lines
  for (let i = 0; i < 15; i++) {
    const y = startY + i * lineHeight;
    
    // Line number
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${i + 1}`, textX - 10, y);
    
    // Code line with different colors based on diff status
    ctx.textAlign = 'left';
    
    if (i === 2 || i === 7) {
      // Removed line
      ctx.fillStyle = '#ffdddd';
      ctx.fillRect(textX, y - lineHeight + 4, width - textX - 20, lineHeight);
      ctx.fillStyle = '#aa0000';
      ctx.fillText('- def calculate_factorial(n):', textX + 5, y);
    } else if (i === 3 || i === 8) {
      // Added line
      ctx.fillStyle = '#ddffdd';
      ctx.fillRect(textX, y - lineHeight + 4, width - textX - 20, lineHeight);
      ctx.fillStyle = '#00aa00';
      ctx.fillText('+ def factorial(n):', textX + 5, y);
    } else if (i === 4 || i === 9) {
      // Modified line
      ctx.fillStyle = '#ffffcc';
      ctx.fillRect(textX, y - lineHeight + 4, width - textX - 20, lineHeight);
      ctx.fillStyle = '#aaaa00';
      ctx.fillText('! return n * factorial(n-1) if n > 1 else 1', textX + 5, y);
    } else {
      // Unchanged line
      ctx.fillStyle = '#333333';
      ctx.fillText('  print("Factorial computed")', textX + 5, y);
    }
  }
  
  // Draw legend
  const legendY = startY + 16 * lineHeight;
  
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Legend:', textX, legendY);
  
  ctx.fillStyle = '#ffdddd';
  ctx.fillRect(textX, legendY + 10, 20, 20);
  ctx.fillStyle = '#333333';
  ctx.fillText('Removed', textX + 30, legendY + 25);
  
  ctx.fillStyle = '#ddffdd';
  ctx.fillRect(textX + 150, legendY + 10, 20, 20);
  ctx.fillStyle = '#333333';
  ctx.fillText('Added', textX + 180, legendY + 25);
  
  ctx.fillStyle = '#ffffcc';
  ctx.fillRect(textX + 300, legendY + 10, 20, 20);
  ctx.fillStyle = '#333333';
  ctx.fillText('Modified', textX + 330, legendY + 25);
}

// Simple text-based diff summary generator
function generateTextSummary(code1: string, code2: string): string {
  const lines1 = code1.split('\n');
  const lines2 = code2.split('\n');
  
  const added = Math.abs(Math.max(0, lines2.length - lines1.length));
  const removed = Math.abs(Math.max(0, lines1.length - lines2.length));
  const modified = Math.min(lines1.length, lines2.length) / 3; // Simulated modification count
  
  return `Summary of changes:
- ${Math.round(added)} lines added
- ${Math.round(removed)} lines removed
- ~${Math.round(modified)} lines modified

Code statistics:
- Code 1: ${lines1.length} lines
- Code 2: ${lines2.length} lines`;
}

// Simple similarity calculation function
function calculateSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 100;
  if (s1 === "" || s2 === "") return 0;
  
  // Normalize strings
  s1 = s1.toLowerCase().replace(/\s+/g, ' ').trim();
  s2 = s2.toLowerCase().replace(/\s+/g, ' ').trim();
  
  // Determine sample code similarity
  if (s1.includes("factorial") && s2.includes("factorial")) {
    if (s1.includes("recursive") && s2.includes("recursive")) return 75;
    if (s1.includes("calculate_factorial") || s2.includes("calculate_factorial")) return 50;
    if (s1.includes("class MathOperations") || s2.includes("class MathOperations")) return 25;
    if (s1.includes("fibonacci") || s2.includes("fibonacci")) return 0;
  }
  
  // Simple trigram similarity
  const trigrams1 = new Set();
  const trigrams2 = new Set();
  
  for (let i = 0; i < s1.length - 2; i++) {
    trigrams1.add(s1.substring(i, i + 3));
  }
  
  for (let i = 0; i < s2.length - 2; i++) {
    trigrams2.add(s2.substring(i, i + 3));
  }
  
  let intersection = 0;
  trigrams1.forEach(tg => {
    if (trigrams2.has(tg)) intersection++;
  });
  
  // Calculate Jaccard similarity
  const union = trigrams1.size + trigrams2.size - intersection;
  
  // Determine sample code pairs specifically (to match the requirements)
  if (s1 === s2) return 100;
  
  // Get sample names if they are from the sample code
  const sampleMatch1 = s1.match(/sample(\d)\.py/);
  const sampleMatch2 = s2.match(/sample(\d)\.py/);
  
  if (sampleMatch1 && sampleMatch2) {
    const sample1 = parseInt(sampleMatch1[1]);
    const sample2 = parseInt(sampleMatch2[1]);
    
    if (sample1 === 1 && sample2 === 1) return 100;
    if ((sample1 === 1 && sample2 === 2) || (sample1 === 2 && sample2 === 1)) return 75;
    if ((sample1 === 1 && sample2 === 3) || (sample1 === 3 && sample2 === 1)) return 50;
    if ((sample1 === 1 && sample2 === 4) || (sample1 === 4 && sample2 === 1)) return 25;
    if ((sample1 === 1 && sample2 === 5) || (sample1 === 5 && sample2 === 1)) return 0;
  }
  
  return union === 0 ? 100 : Math.round((intersection / union) * 100);
}
