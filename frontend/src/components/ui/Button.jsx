export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
    >
      {children}
    </button>
  );
}