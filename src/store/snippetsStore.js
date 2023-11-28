import { create } from "zustand";
// import { join, desktopDir } from "@tauri-apps/api/path";

//? Agregar esta funcionalidad.
// const desktopPath = await desktopDir();

export const useSnippetStore = create(set => ({
  // routePathUser: desktopPath,
  // setRoutePathUser: newRoute => set({ routePathUser: newRoute }),
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
}));
