const CleanFooter = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Built with modern technology for education</p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Team Udaan • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;