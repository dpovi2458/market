export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block w-full">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <input
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-danger mt-1 block">{error}</span>}
    </label>
  );
}
