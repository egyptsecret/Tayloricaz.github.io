export const WordCell = ({ word, isVisible = false }) => {
  return (
    <div className="border color-green">
      <p className={isVisible ? "visible" : "invisible"}>{word}</p>
    </div>
  );
};
