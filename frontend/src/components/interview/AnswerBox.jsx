export default function AnswerBox({ value, onChange }) {
  return (
    <textarea
      className="border rounded-lg p-3 w-full mt-3"
      rows="3"
      placeholder="Write your answer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}