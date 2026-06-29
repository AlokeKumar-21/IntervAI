export function formatQuestions(text) {
  return text
    .split("\n")
    .map((q) => q.replace(/^\d+\.\s*/, ""))
    .filter((q) => q.trim() !== "");
}

export function isEmpty(value) {
  return !value || value.trim().length === 0;
}