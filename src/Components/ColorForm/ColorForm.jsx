import { useState } from "react";
import "./ColorForm.css";

export default function ColorForm({
  onAddColor,
  initialData,
  onUpdateColor,
  onCancel,
}) {
  const [hex, setHex] = useState(initialData?.hex || "#54c73d");
  const [role, setRole] = useState(initialData?.role || "some color");
  const [contrastText, setContrastText] = useState(
    initialData?.contrastText || "#000000",
  );

  return (
    <form
      className="color-form"
      onSubmit={(event) => {
        event.preventDefault();

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
      <h2>{initialData ? "Edit color" : "Add a new color"}</h2>

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
