const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-6 text-indigo-900">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-indigo-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loading;


