import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      <h2 className="color-card-headline">{color.hex}</h2>

      <p>{color.role}</p>

      <p>Contrast: {color.contrastText}</p>
      {isDeleting ? (
        <>
          <span className="color-card-headline">Really delete?</span>
          <button onClick={() => setIsDeleting(false)}>CANCEL</button>
          <button onClick={() => onDeleteColor(color.id)}>DELETE</button>
        </>
      ) : (
        <button onClick={() => setIsDeleting(true)}>DELETE</button>
      )}
    </article>
  );
}
