export default function Button({ children, className = '', loading = false, variant = 'primary', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] font-semibold transition-all duration-300 focus:outline-none focus:ring-[3px] focus:ring-[#94c2ff] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 min-h-[48px]';
  
  const variants = {
    primary: 'bg-gradient-to-br from-[#0F7B85] to-[#0B5C63] text-white hover:from-[#0B5C63] hover:to-[#073D42] shadow-[0_2px_4px_rgba(15,123,133,0.08)] hover:shadow-[0_4px_12px_rgba(15,123,133,0.12)] hover:-translate-y-0.5',
    secondary: 'bg-white text-[#031E21] border-2 border-[#87BDC2] hover:bg-[#EBF4F4] hover:border-[#0F7B85] hover:text-[#0B5C63]',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md',
    outline: 'border-2 border-[#0F7B85] text-[#0F7B85] hover:bg-[#0F7B85] hover:text-white'
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${variantClass} ${className}`}
      disabled={loading || props.disabled}
      {...props}
      style={{ fontFamily: 'Lexend, system-ui, sans-serif' }}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
