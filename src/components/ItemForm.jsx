import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join, desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore.js";
import { twMerge } from "tailwind-merge";
import { SettingsSVG } from "./svgs.jsx";
import { toastAlert, translations } from "../store/utils.js";

function ItemForm(props) {
  const { snippetName } = props,
    {
      setSelectedSnippet,
      selectedSnippet,
      removeSnippet,
      setSlideBarIsVisible,
    } = useSnippetStore(),
    dictionary = translations();

  async function onClickItem() {
    const desktopPath = await desktopDir(),
      myPathName = await join(
        desktopPath,
        "toding",
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
    setSlideBarIsVisible();
  }

  async function handleDelete(event) {
    event.stopPropagation();
    const desktopPath = await desktopDir(),
      myPathName = await join(
        desktopPath,
        "toding",
        "morralla",
        "snippets-code"
      ),
      accept = await window.confirm(`${dictionary.WantDelete} ${snippetName}?`),
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
      toastAlert(dictionary.DeletedNote, "error");
    } else return;
  }

  return (
    <li
      key={snippetName}
      onClick={onClickItem}
      className={twMerge(
        "w-full py-2 px-4 hover:cursor-pointer hover:bg-zinc-800 flex justify-between items-center border-b-2 border-zinc-700",
        selectedSnippet.name === snippetName ? "bg-zinc-800" : "bg-zinc-900"
      )}
    >
      <p>{snippetName}</p>

      <SettingsSVG onClick={e => handleDelete(e)} />
    </li>
  );
}

export default ItemForm;
