  const Alert = ({ message, type, onClose }) => {
      return (
        <div className={`fixed top-14 right-4 z-50`}>
          <div
            className={`px-6 py-4 border-0 rounded-lg shadow-lg relative mb-4 ${
              type === "success"
                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                : "bg-gradient-to-r from-red-400 to-red-600 text-white"
            }`}
          >
            <span className="inline-block align-middle mr-8">{message}</span>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-white hover:text-gray-200 transition duration-200"
            >
              &times;
            </button>
          </div>
        </div>
      );
    };
    
    export default Alert;
    