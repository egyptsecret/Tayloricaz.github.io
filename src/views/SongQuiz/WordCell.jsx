export const WordCell = ({ word, isVisible = false, losingWord = false }) => {
  return (
    <div className="border color-green">
      <p
        className={`${
          isVisible ? "visible animate-appear" : !losingWord && "invisible"
        } ${losingWord && "visible animate-appear-lose "}`}
      >
        {word}
      </p>
    </div>
  );
};
