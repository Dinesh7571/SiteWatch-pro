const AddMonitorModal = ({ isOpen, onClose, onAdd }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Add New Monitor</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
            onAdd({
              name: e.target.name.value,
              url: e.target.url.value,
              type: e.target.type.value,
              interval: e.target.interval.value
            });
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monitor Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monitor Type
                </label>
                <select
                  name="type"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="http">HTTP(s)</option>
                  <option value="ping">Ping</option>
                  <option value="port">Port</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monitoring Interval
                </label>
                <select
                  name="interval"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="300">5 minutes</option>
                  <option value="600">10 minutes</option>
                  <option value="1800">30 minutes</option>
                  <option value="3600">60 minutes</option>
                </select>
              </div>
            </div>
  
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Monitor
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default AddMonitorModal