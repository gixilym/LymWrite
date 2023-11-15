import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore.js";
import { myPathName } from "../store/const.js";
import { twMerge } from "tailwind-merge";
import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";

function ItemForm(props) {
  const { snippetName } = props,
    { setSelectedSnippet, selectedSnippet, removeSnippet } = useSnippetStore();

  async function onClickItem() {
    const filePath = await join(myPathName, `${snippetName}.txt`),
      snippetContent = await readTextFile(filePath);
    setSelectedSnippet({
      name: snippetName,
      content: snippetContent,
      isCode: snippetName.includes("-code"),
    });
  }

  async function handleDelete() {
    const accept = await window.confirm(`Deseas eliminar ${snippetName}?`);
    if (accept) {
      const filePath = await join(myPathName, `${snippetName}.txt`);
      await removeFile(filePath);
      removeSnippet(snippetName);
      toast.error("Nota eliminada", {
        duration: 2000,
        style: {
          backgroundColor: "#202020",
          color: "#fff",
        },
      });
    } else return;
  }

  return (
    <div
      key={snippetName}
      onClick={onClickItem}
      className={twMerge(
        "py-2 px-4 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === snippetName ? "bg-yellow-500" : "bg-zinc-900"
      )}
    >
      <p>{snippetName}</p>

      <div className="flex gap-2">
        <button
          onClick={event => {
            event.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemForm;
