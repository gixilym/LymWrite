import { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore.js";
import { toastAlert, translations } from "../store/utils.js";
import { SettingsSVG } from "./svgs.jsx";

function Form(props) {
  const { setSearchItem, setConfigPage } = props,
    [name, setName] = useState(""),
    {
      addSnippetName,
      setSelectedSnippet,
      setSlideBarIsVisible,
      snippetsNames,
      userConfig,
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

      <div className="flex justify-between items-center mb-8 w-full text-slate-400 gap-x-3">
        <div className="relative  flex justify-center items-center">
          <input
            className="outline-0 border-0 bg-zinc-700 w-60 text-start text-white py-1 px-4 rounded-xl"
            type="text"
            placeholder={dictionary.SearchItem}
            onChange={e => setSearchItem(e.target.value)}
          />
          <svg
            className="absolute top-0.7 right-0 w-10 h-8"
            viewBox="0 0 24 24"
            fill="transparent"
          >
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

        <SettingsSVG onClick={() => setConfigPage(true)} />
      </div>
    </form>
  );
}

export default Form;
