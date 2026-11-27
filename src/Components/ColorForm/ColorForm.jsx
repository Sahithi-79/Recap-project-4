import { useState } from "react";
import "./ColorForm.css";

// ColorForm is a form that allows users to add or update color information.
// It takes in props for adding a new color, updating an existing color,
// and canceling the form.
// The form includes input fields for the color's role, hex value, and contrast text,
// along with color pickers for the hex and contrast text values.
// When the form is submitted,
// it either adds a new color or updates an existing one based on whether initialData
// is provided.

export default function ColorForm({
  onAddColor,
  initialData,
  onUpdateColor,
  onCancel,
}) {
  const [hex, setHex] = useState(initialData ? initialData.hex : "#54c73d");
  const [role, setRole] = useState(
    initialData ? initialData.role : "some color",
  );
  const [contrastText, setContrastText] = useState(
    initialData ? initialData.contrastText : "#000000",
  );

  return (
    <form
      className="color-form"
      onSubmit={(event) => {
        event.preventDefault();

        //either adds a new color or updates an existing one based on whether initialData is provided

        if (initialData) {
          onUpdateColor({
            id: initialData.id,
            hex,
            role,
            contrastText,
          });

          onCancel();
        } else {
          onAddColor({ hex, role, contrastText });
        }
      }}
    >
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="hex">Hex</label>
        <div className="input-row">
          <input
            type="text"
            id="hex"
            name="hex"
            value={hex}
            onChange={(event) => setHex(event.target.value)}
          />
          <input
            type="color"
            value={hex}
            onChange={(event) => setHex(event.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contrastText">Contrast Text</label>
        <div className="input-row">
          <input
            type="text"
            id="contrastText"
            name="contrastText"
            value={contrastText}
            onChange={(event) => setContrastText(event.target.value)}
          />
          <input
            type="color"
            value={contrastText}
            onChange={(event) => setContrastText(event.target.value)}
          />
        </div>
      </div>

      <button type="submit">
        {initialData ? "UPDATE COLOR" : "ADD COLOR"}
      </button>

      {initialData && (
        <button type="button" onClick={onCancel}>
          CANCEL
        </button>
      )}
    </form>
  );
}
