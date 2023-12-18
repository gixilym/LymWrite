import CodeTemplate from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";

function EditorCode(props) {
  const { contentSnippet, setContentSnippet } = props,
    { userConfig } = useSnippetStore();

  return (
    <div className="justify-start items-center flex flex-col w-[95%] h-full bg-zinc-400 overflow-hidden">
      <CodeTemplate
        language="javascript"
        options={{
          fontSize: 20,
          fontFamily: "Open Sans",
        }}
        theme={
          userConfig.theme === "bg-[#dadada] text-slate-900"
            ? "light"
            : "vs-dark"
        }
        value={contentSnippet}
        onChange={code => setContentSnippet(code)}
      />
    </div>
  );
}

export default EditorCode;
