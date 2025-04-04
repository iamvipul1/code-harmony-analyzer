
import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  language?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  height = "400px",
  language = "python",
  placeholder = "# Enter your Python code here...",
  readOnly = false
}) => {
  const editorRef = useRef<any>(null);
  
  useEffect(() => {
    // If the editor is empty and there's a placeholder, set it
    if (editorRef.current && !value && placeholder) {
      const model = editorRef.current.getModel();
      if (model && model.getValueLength() === 0) {
        // This is just setting the placeholder as a decoration
        editorRef.current.createDecorationsCollection([
          {
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1
            },
            options: {
              after: {
                content: placeholder,
                inlineClassName: 'text-muted-foreground/50'
              }
            }
          }
        ]);
      }
    }
  }, [value, placeholder, editorRef]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <div className="code-editor rounded-md border overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          readOnly,
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
