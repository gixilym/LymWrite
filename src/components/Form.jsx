import { useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { myPathName } from "../store/const.js";
import { useSnippetStore } from "../store/snippetsStore.js";
import toast from "react-hot-toast";
import { join } from "@tauri-apps/api/path";

function Form() {
  const [snippetName, setSnippetName] = useState(""),
    { addSnippetName } = useSnippetStore();

  async function onSubmit(event) {
    event.preventDefault();
    const filePath = await join(myPathName, `${snippetName}.txt`);
    await writeTextFile(filePath, "");
    setSnippetName("");
    addSnippetName(snippetName);
    toast.success("Nota Guardada", {
      duration: 2000,
      style: {
        backgroundColor: "#343434",
        color: "#fff",
      },
    });
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input
        onChange={e => setSnippetName(e.target.value)}
        value={snippetName}
        type="text"
        placeholder="Write a snippet code"
        className="bg-zinc-950 w-full border-none outline-none p-4"
      />

      <button className="hidden">Save</button>
    </form>
  );
}

export default Form;
