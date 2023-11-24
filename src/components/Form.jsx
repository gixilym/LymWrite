import { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore.js";
import { toastAlert } from "../store/utils.js";

function Form() {
  const [snippetName, setSnippetName] = useState(""),
    { addSnippetName, setSelectedSnippet } = useSnippetStore(),
    snippetIsCode = snippetName.includes("-code"),
    snippetCode = snippetName.replace(/-/g, ""),
    newSnippet = {
      name: snippetName,
      content: snippetIsCode
        ? `let ${snippetCode} = "${snippetName}";`
        : `## ${snippetName}`,
      isCode: snippetName.includes("-code"),
    };

  async function onSubmit(event) {
    event.preventDefault();
    setSelectedSnippet(newSnippet);
    setSnippetName("");
    addSnippetName(snippetName);
    toastAlert("Nota Guardada", "success");
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={e => setSnippetName(e.target.value)}
        value={snippetName}
        className="bg-zinc-900 w-full border-b-2 border-zinc-800 outline-none p-4"
        type="text"
        placeholder="Añade un nuevo item"
      />
      <button className="hidden" type="submit">
        Save
      </button>
    </form>
  );
}

export default Form;
