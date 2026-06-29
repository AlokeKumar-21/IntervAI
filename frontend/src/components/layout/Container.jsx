export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
}