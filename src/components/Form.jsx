import { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore.js";
import { toastAlert, translations } from "../store/utils.js";
import { removeFile } from "@tauri-apps/api/fs";
import { join, desktopDir } from "@tauri-apps/api/path";
import { confirm } from "@tauri-apps/api/dialog";
import { SettingsSVG } from "./svgs.jsx";
import { twMerge } from "tailwind-merge";

function Form(props) {
  const { setSearchItem, setConfigPage, paperIsOpen, setPaperIsOpen } = props,
    [name, setName] = useState(""),
    {
      addSnippetName,
      setSelectedSnippet,
      setSlideBarIsVisible,
      snippetsNames,
      userConfig,
      paperBin,
      cleanPaperBin,
    } = useSnippetStore(),
    dictionary = translations(),
    snippetIsCode = name.includes("-code"),
    snippetCode = name.replace(/-/g, ""),
    newSnippet = {
      name: name,
      content: snippetIsCode ? `let ${snippetCode} = "${name}";` : `## ${name}`,
      isCode: name.includes("-code"),
    };

  async function onSubmit(event) {
    event.preventDefault();

    if (!name) {
      toastAlert(dictionary.EnterName, "error");
      return;
    }

    if (snippetsNames.some(nameFile => nameFile === name)) {
      toastAlert(dictionary.RepeatedItem, "error");
      return;
    }

    setName("");
    addSnippetName(name);
    setSelectedSnippet(newSnippet);
    setSlideBarIsVisible();
    toastAlert(dictionary.SavedNote, "success");
  }

  async function handleCleanPaperBin() {
    const confirmClean = await confirm(dictionary.CleanEvery, {
      title: "LymWrite",
      type: "warning",
    });

    const desktop = await desktopDir(),
      path = await join(desktop, "lymwrite-files");

    if (confirmClean) {
      cleanPaperBin();
      toastAlert(dictionary.DeleteFiles, "success");
      setPaperIsOpen(false);
      await paperBin.map(async function (item) {
        const filePath = await join(path, `${item}.txt`);
        await removeFile(filePath);
      });
    } else return;
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        className={`${userConfig.theme} w-full outline-none p-4 border-l-2 border-b-2 rounded-xl border-zinc-700 mb-4`}
        type="text"
        placeholder={dictionary.AddNewItem}
      />
      <button className="hidden" type="submit">
        Save
      </button>

      <div className="flex justify-start items-center mb-8 w-full text-slate-400 gap-x-3">
        <div className="relative flex justify-between items-center w-3/6 bg-zinc-700 rounded-xl">
          <input
            className="outline-0 border-0 bg-zinc-700  rounded-xl w-3/4 text-center text-white py-1"
            type="text"
            placeholder={dictionary.SearchItem}
            onChange={e => setSearchItem(e.target.value)}
          />
          <svg className="w-1/4 h-8" viewBox="0 0 24 24" fill="transparent">
            <rect width="24" height="24" fill="transparent" />
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="#94a3b8"
              strokeLinejoin="round"
            />
            <path
              d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
              fill="#94a3b8"
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={() => setPaperIsOpen(!paperIsOpen)}
          className={twMerge(
            paperIsOpen
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-zinc-700 hover:bg-zinc-600 hover:text-white ",
            `outline-0 border-0 cursor-pointer w-max text-center py-1 px-4 rounded-xl`
          )}
        >
          {dictionary.Paper}
        </button>

        {paperIsOpen && paperBin.length > 0 && (
          <button
            className="bg-red-500 hover:bg-red-400 cursor-pointer text-white outline-0 border-0 w-max px-4 py-1 rounded-xl"
            onClick={handleCleanPaperBin}
            type="button"
          >
            {dictionary.Clean}
          </button>
        )}

        <SettingsSVG onClick={() => setConfigPage(true)} />
      </div>
    </form>
  );
}

export default Form;
