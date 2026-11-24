import "./Color.css";

export default function Color({ color }) {
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
    </article>
  );
}
