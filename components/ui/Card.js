export default function Card({ children, className = '', hover = false }) {
  const hoverClass = hover ? 'card-scale' : '';
  return (
    <div 
      className={`bg-white rounded-[12px] border border-[#C3DEE0] p-4 transition-all duration-300 ${hoverClass} ${className}`}
      style={{ boxShadow: '0 2px 4px rgba(15, 123, 133, 0.08)' }}
    >
      {children}
    </div>
  );
}
