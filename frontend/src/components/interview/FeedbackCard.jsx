export default function FeedbackCard({ feedback }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-3 mt-3 text-sm whitespace-pre-wrap">
      {feedback}
    </div>
  );
}