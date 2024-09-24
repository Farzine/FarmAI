import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-6xl mb-4">🚫</div>
      
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
