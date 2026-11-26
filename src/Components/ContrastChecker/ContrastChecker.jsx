import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ContrastChecker({ hex, contrastText }) {
  const url = `https://webaim.org/resources/contrastchecker/?fcolor=${contrastText.slice(
    1,
  )}&bcolor=${hex.slice(1)}&api`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) {
    return <p>Loading contrast...</p>;
  }

  if (error) {
    return <p>Failed to check contrast.</p>;
  }

  return <p>Overall Contrast Score: {data?.AA === "pass" ? "Yup" : "Nope"}</p>;
}
