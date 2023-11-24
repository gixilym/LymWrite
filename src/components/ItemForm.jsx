import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join, desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore.js";
import { twMerge } from "tailwind-merge";
import { SettingsSVG } from "./svgs.jsx";
import { toastAlert } from "../store/utils.js";

function ItemForm(props) {
  const { snippetName } = props,
    { setSelectedSnippet, selectedSnippet, removeSnippet } = useSnippetStore();

  async function onClickItem() {
    const desktopPath = await desktopDir(),
      myPathName = await join(
        desktopPath,
        "every",
        "morralla",
        "snippets-code"
      ),
      filePath = await join(myPathName, `${snippetName}.txt`),
      snippetContent = await readTextFile(filePath),
      newSnippet = {
        name: snippetName,
        content: snippetContent,
        isCode: snippetName.includes("-code"),
      };
    setSelectedSnippet(newSnippet);
  }

  async function handleDelete(event) {
    event.stopPropagation();
    const desktopPath = await desktopDir(),
      myPathName = await join(
        desktopPath,
        "every",
        "morralla",
        "snippets-code"
      ),
      accept = await window.confirm(`Deseas eliminar ${snippetName}?`),
      deletedSnippet = {
        name: null,
        content: "",
        isCode: false,
      };

    if (accept) {
      const filePath = await join(myPathName, `${snippetName}.txt`);
      await removeFile(filePath);
      removeSnippet(snippetName);
      setSelectedSnippet(deletedSnippet);
      toastAlert("Nota eliminada", "error");
    } else return;
  }

  return (
    <li
      key={snippetName}
      onClick={onClickItem}
      className={twMerge(
        "w-full py-2 px-4 hover:cursor-pointer hover:bg-zinc-800 flex justify-between",
        selectedSnippet.name === snippetName ? "bg-zinc-800" : "bg-zinc-900"
      )}
    >
      <p>{snippetName}</p>

      <SettingsSVG onClick={e => handleDelete(e)} />
    </li>
  );
}

export default ItemForm;
