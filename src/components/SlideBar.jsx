import { useSnippetStore } from "../store/snippetsStore.js";
import Form from "./Form.jsx";
import ListForm from "./ListForm.jsx";
import { motion, AnimatePresence } from "framer-motion";

function SlideBar() {
  const { slideBarIsVisible } = useSnippetStore();
  return (
    slideBarIsVisible && (
      <AnimatePresence>
        <motion.aside
          className="bg-zinc-900 w-[60%] h-5/6 overflow-y-scroll"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form />
          <ListForm />
        </motion.aside>
      </AnimatePresence>
    )
  );
}

export default SlideBar;

//? No me sale la animación de salida si utilizo onMouseEnter, lo guardo para el futuro.
// function onMouseEnter() {
//   setTimeout(() => setIsVisible(true), 300);
// }

// function onMouseLeave() {
//   setTimeout(() => setIsVisible(false), 300);
// }
