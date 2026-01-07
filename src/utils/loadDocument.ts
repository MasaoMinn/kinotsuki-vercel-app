export async function loadDocument(
  slug: string,
  lang: "en" | "zh" | "ja"
): Promise<string> {
  const url = `https://cdn.jsdelivr.net/gh/MasaoMinn/react-furry-error-docs@main/docs/${slug}_${lang}.md`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load markdown: ${res.status}`);
  }

  return res.text();
}
