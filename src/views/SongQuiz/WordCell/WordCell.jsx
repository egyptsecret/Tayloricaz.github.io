export const WordCell = ({ word, isVisible = false }) => {
  return (
    <div className="border color-green">
      <p
        className={`${
          isVisible ? "visible animate-[show_4s_ease-in_forwards]" : "invisible"
        }`}
      >
        {word}
      </p>
    </div>
  );
};
