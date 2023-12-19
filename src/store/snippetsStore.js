import { create } from "zustand";

export const useSnippetStore = create(set => ({
  snippetsNames: [],
  addSnippetName: name =>
    set(state => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  setSnippetsNames: names => set({ snippetsNames: names }),
  selectedSnippet: {
    name: null,
    content: "",
    isCode: false,
  },
  setSelectedSnippet: snippet => set({ selectedSnippet: snippet }),
  removeSnippet: snippet =>
    set(state => ({
      snippetsNames: state.snippetsNames.filter(n => n !== snippet),
    })),

  slideBarIsVisible: false,
  setSlideBarIsVisible: () =>
    set(state => ({ slideBarIsVisible: !state.slideBarIsVisible })),

  userConfig: {
    language: "en",
    theme: "bg-zinc-800 text-white",
    fontSize: "text-2xl",
    fontFamily: "font-Roboto",
    textCenter: false,
  },
  setUserConfig: newConfig =>
    set(state => ({ userConfig: { ...state.userConfig, ...newConfig } })),
}));
