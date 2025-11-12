
const parseBubbleShape = (shape: string) => {
  const parts = shape.split(" ");
  const type = parts[0];
  const params = parts.slice(1).map(Number);
  if (params.length < 1) params.push(10, 20);
  return { type, params };
};

export { parseBubbleShape };