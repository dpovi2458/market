export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block w-full">
      {label && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400 ${
          error ? 'border-red-300 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="flex items-center gap-1 text-sm text-red-600 mt-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </label>
  );
}
