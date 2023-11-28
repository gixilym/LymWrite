import { useSnippetStore } from "../store/snippetsStore.js";
import Editor from "./Editor.jsx";
import { twMerge } from "tailwind-merge";

function FileContent() {
  const { slideBarIsVisible } = useSnippetStore();

  return (
    <main
      className={twMerge(
        "h-screen bg-[#1e1e1e] flex justify-center items-center",
        slideBarIsVisible ? "hidden" : "w-full"
      )}
    >
      <Editor />
    </main>
  );
}

export default FileContent;
