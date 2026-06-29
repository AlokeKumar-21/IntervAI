export default function RoleInput({
  role,
  setRole,
  onGenerate,
  loading
}) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
      <input
        className="border rounded-lg p-3 w-full mb-3"
        placeholder="Enter Job Role (e.g. Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        onClick={onGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </div>
  );
}