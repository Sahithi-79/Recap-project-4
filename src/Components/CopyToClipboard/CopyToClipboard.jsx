import { useState, useEffect } from "react";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    // Copy the hex value to the clipboard and set isCopied to true
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

      {isCopied ? <p>COPIED!</p> : null}
    </>
  );
}
