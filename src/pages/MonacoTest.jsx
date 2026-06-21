import Editor from "@monaco-editor/react";

export default function MonacoTest() {
  return (
    <div className="p-6">
      <Editor
        height="400px"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="print('hello')"
      />
    </div>
  );
}
