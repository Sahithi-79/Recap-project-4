import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        <ColorForm
          initialData={color}
          onUpdateColor={onUpdateColor}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2 className="color-card-headline">{color.hex}</h2>
          <CopyToClipboard hex={color.hex} />
          <p>{color.role}</p>
          <p>Contrast: {color.contrastText}</p>
          <ContrastChecker hex={color.hex} contrastText={color.contrastText} />
          <button onClick={() => setIsEditing(true)}>EDIT</button>
        </>
      )}

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
