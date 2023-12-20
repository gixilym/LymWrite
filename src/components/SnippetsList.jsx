import { useEffect, useState } from "react";
import Form from "./Form.jsx";
import ListForm from "./ListForm.jsx";
import { useSnippetStore } from "../store/snippetsStore.js";
import { motion, AnimatePresence } from "framer-motion";

function SnippetsList({ setConfigPage }) {
  const { slideBarIsVisible } = useSnippetStore(),
    [searchItem, setSearchItem] = useState(null),
    [paperIsOpen, setPaperIsOpen] = useState(false);

  useEffect(() => {
    if (searchItem === "") {
      setSearchItem(null);
    }
  }, [searchItem]);

  useEffect(() => {
    if (searchItem !== "") {
      setSearchItem(null);
    }
  }, [slideBarIsVisible]);

  return (
    slideBarIsVisible && (
      <AnimatePresence>
        <motion.aside
          className="bg-transparent w-[60%] h-5/6 overflow-x-hidden overflow-y-visible"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Form
            setSearchItem={setSearchItem}
            setConfigPage={setConfigPage}
            paperIsOpen={paperIsOpen}
            setPaperIsOpen={setPaperIsOpen}
          />
          <ListForm
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            paperIsOpen={paperIsOpen}
          />
        </motion.aside>
      </AnimatePresence>
    )
  );
}

export default SnippetsList;
