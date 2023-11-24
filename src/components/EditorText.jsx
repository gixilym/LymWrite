function EditorText(props) {
  const { contentSnippet, setContentSnippet } = props;

  return (
    <textarea
      value={contentSnippet}
      onChange={e => setContentSnippet(e.target.value)}
      className="justify-start items-center flex flex-col px-20 bg-zinc-900 w-full h-screen outline-none overflow-y-visible resize-none text-center py-10 text-lg font-Roboto font-light"
    />
  );
}
export default EditorText;
