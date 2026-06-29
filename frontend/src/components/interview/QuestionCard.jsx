export default function QuestionCard({ question }) {
  return (
    <div className="bg-white border rounded-xl p-4 mb-4 shadow-sm">
      <p className="font-medium text-gray-800">{question}</p>
    </div>
  );
}