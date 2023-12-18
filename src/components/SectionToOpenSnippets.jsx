import { useSnippetStore } from "../store/snippetsStore.js";

function SectionToOpenSnippets() {
  const { slideBarIsVisible, setSlideBarIsVisible } = useSnippetStore();

  return (
    !slideBarIsVisible && (
      <div
        onMouseEnter={() => setSlideBarIsVisible()}
        className="absolute left-0 top-0 h-24 w-16 flex self-start bg-transparent"
      />
    )
  );
}

export default SectionToOpenSnippets;
