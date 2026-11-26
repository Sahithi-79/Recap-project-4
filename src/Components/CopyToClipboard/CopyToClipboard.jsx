import { useState, useEffect } from "react";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(hex);
    setIsCopied(true);
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <>
      <button onClick={handleCopy}>COPY</button>

      {isCopied ? <p>SUCCESSFULLY COPIED!</p> : null}
    </>
  );
}
