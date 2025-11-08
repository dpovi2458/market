export default function Button({ children, className = '', loading = false, variant = 'primary', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-sm hover:shadow-md',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
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
