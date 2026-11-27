import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    //color card component that displays the color information and provides
    // options to edit or delete the color.
    // The background color of the card is set to the color's hex value,
    // and the text color is set to the contrast text value.
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      If the user is editing the color, a ColorForm component is rendered // to
      allow them to update the color information.
      {isEditing ? (
        <ColorForm
          initialData={color}
          onUpdateColor={onUpdateColor}
          //close the form when the user cancels the edit
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        //is editing false, the color information is displayed
        // along with options to copy the hex value to the clipboard,
        <>
          <h2 className="color-card-headline">{color.hex}</h2>
          <CopyToClipboard hex={color.hex} />
          <p>{color.role}</p>
          <p>Contrast: {color.contrastText}</p>
          <ContrastChecker hex={color.hex} contrastText={color.contrastText} />
          <button onClick={() => setIsEditing(true)}>EDIT</button>
        </>
      )}
      // If the user is deleting the color, a confirmation message is displayed
      with options // to cancel or confirm the deletion.
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
