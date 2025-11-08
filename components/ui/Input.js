export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block w-full">
      {label && (
        <span className="flex items-center gap-1.5 text-sm font-medium mb-2" style={{ color: '#0B5C63', fontFamily: 'Lexend, system-ui, sans-serif' }}>
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-[10px] border-2 px-4 py-3 focus:outline-none focus:ring-[3px] focus:ring-[#94c2ff] focus:ring-offset-1 focus:border-transparent transition-all placeholder:text-[#4B9CA3] ${
          error ? 'border-red-300 focus:ring-red-500' : 'border-[#C3DEE0] hover:border-[#87BDC2]'
        } ${className}`}
        style={{ fontFamily: 'Noto Sans, sans-serif' }}
        {...props}
      />
      {error && (
        <span className="flex items-center gap-1 text-sm text-red-600 mt-1.5 font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </label>
  );
}
