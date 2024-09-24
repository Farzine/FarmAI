function UnauthPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          You don't have access to view this page
        </h1>
        <p className="text-gray-600">
          Please contact the administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
}

export default UnauthPage;
