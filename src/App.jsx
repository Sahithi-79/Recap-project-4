import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialColors, initialThemes } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [allColors, setAllColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [selectedThemeId, setSelectedThemeId] = useState("t1");
  const [isEditingTheme, setIsEditingTheme] = useState(false);

  // adding a new theme object
  function handleAddTheme() {
    const newTheme = {
      id: nanoid(),
      name: `New Theme ${themes.length}`,
      colors: [],
    };

    // Add the new theme to the themes state and select it
    setThemes([...themes, newTheme]);
    setSelectedThemeId(newTheme.id);
  }

  //updating the name of the theme object

  function handleUpdateTheme(updatedName) {
    setThemes(
      themes.map((theme) =>
        theme.id === selectedThemeId ? { ...theme, name: updatedName } : theme,
      ),
    );
  }

  function handleDeleteTheme() {
    setThemes(themes.filter((theme) => theme.id !== selectedThemeId));
    setSelectedThemeId("t1");
    setIsEditingTheme(false);
  }

  //adding a new color object to the colors state and the selected theme's colors array

  function handleAddColor(newColor) {
    const newColorWithId = {
      id: nanoid(),
      ...newColor,
    };

    setAllColors([newColorWithId, ...allColors]);

    setThemes(
      themes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [newColorWithId.id, ...theme.colors] }
          : theme,
      ),
    );
  }

  //updating the color object in the colors state and the selected theme's colors array

  function handleUpdateColor(updatedColor) {
    setAllColors(
      allColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color,
      ),
    );
  }

  //deleting the color object from the colors state and the selected theme's colors array

  function handleDeleteColor(id) {
    setAllColors(allColors.filter((color) => color.id !== id));

    setThemes(
      themes.map((theme) => ({
        ...theme,
        colors: theme.colors.filter((colorId) => colorId !== id),
      })),
    );
  }

  //connects the selected theme to the colors state by filtering the colors based on the selected theme's colors array
  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

  const colors = allColors.filter((color) =>
    selectedTheme.colors.includes(color.id),
  );

  return (
    <>
      <h1>Theme Creator</h1>
      <button type="button" onClick={handleAddTheme}>
        ADD THEME
      </button>
      <button
        type="button"
        onClick={() => setIsEditingTheme(true)}
        disabled={selectedThemeId === "t1"}
      >
        EDIT
      </button>
      <button
        type="button"
        onClick={handleDeleteTheme}
        disabled={selectedThemeId === "t1"}
      >
        DELETE
      </button>
      {isEditingTheme && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateTheme(event.target.elements.themeName.value);
            setIsEditingTheme(false);
          }}
        >
          <input
            type="text"
            name="themeName"
            defaultValue={selectedTheme.name}
          />
          <button type="submit">SAVE</button>
          <button type="button" onClick={() => setIsEditingTheme(false)}>
            CANCEL
          </button>
        </form>
      )}
      {/* When you select another theme, this state changes. */}
      <select
        value={selectedThemeId}
        onChange={(event) => setSelectedThemeId(event.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}

        {/* 
  ColorForm component is rendered to add a new color to the selected
  theme. The handleAddColor function is passed as a prop to the ColorForm
  component, which will be called when the form is submitted.
*/}
      </select>
      <ColorForm onAddColor={handleAddColor} />
      {colors.length === 0 ? (
        <p>No colors yet. Add a new color to your theme!</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onUpdateColor={handleUpdateColor}
          />
        ))
      )}
    </>
  );
}

export default App;
