import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const ContentCard = ({
  name,
  startComparing,
  onTextChange,
  text,
  onSelection,
  onClick,
  highlightedSearch,
}) => {
  const textContent = name === "input" ? highlightedSearch : text.output;
  const textValue = name === "input" ? text.input : text.output;

  useEffect(() => {
    const firstHighlightedText = document.querySelector(".highlight");
    firstHighlightedText?.scrollIntoView();
  }, [highlightedSearch]);

  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="font-semibold capitalize">{name} :</h2>
      {startComparing ? (
        <Card className="w-full flex border border-input bg-transparent px-3 py-2 text-sm shadow-sm rounded-xl h-[400px] overflow-y-scroll scroll-smooth">
          <CardContent className="w-full h-full">
            <div
              onMouseUp={onSelection.bind(null, name)}
              onClick={onClick}
              dangerouslySetInnerHTML={{ __html: textContent }}
            ></div>
          </CardContent>
        </Card>
      ) : (
        <Textarea
          className="w-full h-full rounded-xl font-sans min-h-[400px]"
          onChange={(e) => onTextChange(e, name)}
          value={textValue}
        />
      )}
    </div>
  );
};

export default ContentCard;
