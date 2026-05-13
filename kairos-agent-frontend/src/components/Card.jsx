export default function Card({ 
  children, 
  title = '', 
  subtitle = '', 
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`bg-white rounded-lg shadow hover:shadow-lg transition p-6 ${className}`}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
