import toast from "react-hot-toast";
import { useSnippetStore } from "./snippetsStore.js";

function toastAlert(message, type) {
  if (type === "error") {
    toast.error(message, {
      duration: 2000,
      style: {
        backgroundColor: "#202020",
        color: "#fff",
      },
    });
  }

  if (type === "success") {
    toast.success(message, {
      duration: 2000,
      style: {
        backgroundColor: "#202020",
        color: "#fff",
      },
    });
  }

  return;
}

function translations() {
  const dictionary = {
    Configuration: userLanguage("Configuration", "Configuración"),
    Language: userLanguage("Language", "Idioma"),
    Theme: userLanguage("Theme", "Tema"),
    ClearNight: userLanguage("Clear Night", "Noche Clara"),
    DarkNight: userLanguage("Dark Night", "Noche Oscura"),
    Day: userLanguage("Day", "Día"),
    FontSize: userLanguage("Font Size", "Tamaño de letra"),
    VerySmall: userLanguage("Very small", "Muy pequña"),
    Small: userLanguage("Small", "Pequeña"),
    Medium: userLanguage("Medium", "Media"),
    Large: userLanguage("Large", "Grande"),
    FontFamily: userLanguage("Font Family", "Fuente de letra"),
    CreatedBySL: userLanguage("Created by Staff Lym", "Creado por Staff Lym"),
  };

  return dictionary;
}

function userLanguage(enText, esText) {
  const { userConfig } = useSnippetStore();
  return userConfig.language === "en" ? enText : esText;
}

export { toastAlert, translations };
