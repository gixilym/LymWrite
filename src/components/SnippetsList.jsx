import Form from "./Form.jsx";
import ListForm from "./ListForm.jsx";
import { useSnippetStore } from "../store/snippetsStore.js";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../store/utils.js";

function SnippetsList(props) {
  const { setConfigPage } = props,
    { slideBarIsVisible, userConfig } = useSnippetStore(),
    dictionary = translations();

  return (
    slideBarIsVisible && (
      <>
        <p
          onClick={() => setConfigPage(true)}
          className={`${userConfig.fontFamily} text-1xl cursor-pointer tracking-wider text-lg text-center text-zinc-400 hover:text-white w-38 absolute top-5 right-5 flex justify-center items-center`}
        >
          {dictionary.Configuration}
        </p>
        <AnimatePresence>
          <motion.aside
            className="bg-zinc-900 w-[60%] h-5/6 overflow-x-hidden overflow-y-visible"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Form />
            <ListForm />
          </motion.aside>
        </AnimatePresence>
      </>
    )
  );
}

export default SnippetsList;
