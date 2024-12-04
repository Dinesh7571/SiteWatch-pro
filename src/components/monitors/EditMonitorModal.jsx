const EditMonitorModal = ({ isOpen, onClose, onEdit, monitor }) => {
  if (!isOpen || !monitor) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-800/95 to-gray-900/95 rounded-2xl p-8 w-full max-w-md border border-gray-700/50 shadow-2xl transform transition-all animate-fadeIn">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 border-b border-gray-700/50 pb-4">Edit Monitor</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onEdit(monitor.id, {
            name: e.target.name.value,
            url: e.target.url.value,
            type: e.target.type.value,
            interval: e.target.interval.value
          });
        }}>
          <div className="space-y-6">
            <div className="transform transition-all hover:scale-[1.02] group">
              <label className="block text-sm font-semibold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">
                Monitor Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={monitor.name}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 hover:bg-gray-700/40"
                required
              />
            </div>

            <div className="transform transition-all hover:scale-[1.02] group">
              <label className="block text-sm font-semibold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">
                URL
              </label>
              <input
                type="url"
                name="url"
                defaultValue={monitor.url}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 hover:bg-gray-700/40"
                required
              />
            </div>

            <div className="transform transition-all hover:scale-[1.02] group">
              <label className="block text-sm font-semibold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">
                Monitor Type
              </label>
              <select
                name="type"
                defaultValue={monitor.type}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-gray-700/40"
              >
                <option value="http">HTTP(s)</option>
                <option value="ping">Ping</option>
                <option value="port">Port</option>
              </select>
            </div>

            <div className="transform transition-all hover:scale-[1.02] group">
              <label className="block text-sm font-semibold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">
                Monitoring Interval
              </label>
              <select
                name="interval"
                defaultValue={monitor.interval}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 hover:bg-gray-700/40"
              >
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="3600">60 minutes</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 hover:bg-gray-700/30 rounded-lg hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMonitorModal