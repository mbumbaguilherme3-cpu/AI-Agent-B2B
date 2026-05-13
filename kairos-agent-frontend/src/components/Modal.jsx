export default function Modal({ 
  isOpen = false, 
  onClose = () => {},
  title = '',
  children,
  actions = null,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer / Actions */}
        {actions && (
          <div className="flex gap-2 p-6 border-t border-gray-200 justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
