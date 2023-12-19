import { twMerge } from "tailwind-merge";
import { useSnippetStore } from "../store/snippetsStore";
import { motion } from "framer-motion";

function EditorText(props) {
  const { contentSnippet, setContentSnippet } = props,
    { userConfig, slideBarIsVisible } = useSnippetStore(),
    textareaProps = {
      value: contentSnippet,
      onChange: e => setContentSnippet(e.target.value),
      className: twMerge(
        userConfig.textCenter ? "text-center" : "text-start",
        `${userConfig.theme} justify-start items-center flex flex-col px-20 w-full h-screen outline-none overflow-y-visible resize-none  py-10`
      ),
    };

  if (slideBarIsVisible) return <textarea {...textareaProps} />;

  return (
    <motion.textarea
      {...textareaProps}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}

export default EditorText;
