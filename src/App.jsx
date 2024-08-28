import { useEffect, useState } from "react";
import ContentCard from "./components/ContentCard";
import { Button } from "@/components/ui/button";
import { NAMES } from "./utils/constant";
import { highlightSearchTerm } from "./utils/helper";

const highlight = new Highlight();

CSS.highlights.set("my-custom-highlight", highlight);

function App() {
  const [startCompare, setStartCompare] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [highlightedSearch, setHighlightedSearch] = useState("");
  const [text, setText] = useState({
    input:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    output:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  });

  const highlightedClickHandler = () => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const clickedRange = selection.getRangeAt(0);

      if (highlight) {
        highlight.forEach((range) => {
          if (
            range.startOffset <= clickedRange.startOffset &&
            range.endOffset >= clickedRange.endOffset
          ) {
            if (range.toString()) {
              setSelectedText(range.toString());
            }
          }
        });
      }
    }
  };

  const textSelectionHandler = (name) => {
    if (name === "input") {
      return;
    }
    const selectedRange = window.getSelection().getRangeAt(0);
    highlight.add(selectedRange);
  };

  const startComparisonHandler = () => {
    setStartCompare((prevState) => !prevState);
  };

  const textHandler = (e, name) => {
    if (name === "input") {
      setText((prevState) => {
        return { ...prevState, input: e.target.value };
      });
    } else {
      setText((prevState) => {
        return { ...prevState, output: e.target.value };
      });
    }
  };

  useEffect(() => {
    if (selectedText && startCompare) {
      const highlightedParagraph = highlightSearchTerm(
        text.input,
        selectedText
      );
      setHighlightedSearch(highlightedParagraph);
    } else {
      setHighlightedSearch(text.input);
    }
  }, [selectedText, startCompare, text.input]);

  const isButtonDisabled = !text.input.trim() || !text.output.trim();

  return (
    <main className="flex gap-2 flex-col">
      <div className="flex justify-between p-10 items-center gap-20 h-full">
        {NAMES.map((name, index) => {
          return (
            <ContentCard
              name={name}
              key={index}
              startComparing={startCompare}
              onTextChange={textHandler}
              text={text}
              onSelection={textSelectionHandler}
              onClick={highlightedClickHandler}
              highlightedSearch={highlightedSearch}
            />
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="m-auto px-16 py-6 rounded-md"
          onClick={startComparisonHandler}
          disabled={isButtonDisabled}
        >
          {startCompare ? "Edit Text" : "Start Compare"}
        </Button>
      </div>
    </main>
  );
}

export default App;
