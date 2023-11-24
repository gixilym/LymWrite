import CodeTemplate from "@monaco-editor/react";

function EditorCode(props) {
  const { contentSnippet, setContentSnippet } = props;

  return (
    <div className="justify-start items-center flex flex-col w-[95%] h-full bg-zinc-400 overflow-hidden">
      <CodeTemplate
        language="javascript"
        options={{
          fontSize: 18,
          fontFamily: "Open Sans",
        }}
        theme="vs-dark"
        value={contentSnippet}
        onChange={code => setContentSnippet(code)}
      />
    </div>
  );
}

export default EditorCode;
