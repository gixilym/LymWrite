import { twMerge } from "tailwind-merge";
import { useSnippetStore } from "../store/snippetsStore";

function EditorText(props) {
  const { contentSnippet, setContentSnippet } = props,
    { userConfig } = useSnippetStore();

  return (
    <textarea
      value={contentSnippet}
      onChange={e => setContentSnippet(e.target.value)}
      className={twMerge(
        userConfig.textCenter ? "text-center" : "text-start",
        `justify-start items-center flex flex-col px-20 bg-zinc-900 w-full h-screen outline-none overflow-y-visible resize-none  py-10`
      )}
    />
  );
}
export default EditorText;
