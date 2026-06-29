export default function Card({ children }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      {children}
    </div>
  );
}