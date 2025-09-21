const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-hero-title">
            Government Digital Portal
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-description">
            A simple, accessible, and efficient platform designed to serve citizens with transparency and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-testid="button-get-started"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              Get Started
            </button>
            <button
              data-testid="button-learn-more"
              className="border border-border text-foreground px-8 py-3 rounded-md font-medium hover:bg-secondary transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12" data-testid="text-features-title">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-soft" data-testid="card-feature-accessibility">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Accessible Design</h3>
              <p className="text-muted-foreground">Built with accessibility in mind, ensuring all citizens can use our services.</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-soft" data-testid="card-feature-security">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">Government-grade security ensuring your data and privacy are protected.</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg shadow-soft" data-testid="card-feature-efficiency">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fast & Efficient</h3>
              <p className="text-muted-foreground">Streamlined processes to save time and provide quick access to services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12" data-testid="text-services-title">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-strong transition-shadow" data-testid="card-service-education">
              <h3 className="text-lg font-semibold text-foreground mb-2">Education Services</h3>
              <p className="text-muted-foreground text-sm">Access educational resources and manage academic processes.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-strong transition-shadow" data-testid="card-service-healthcare">
              <h3 className="text-lg font-semibold text-foreground mb-2">Healthcare Services</h3>
              <p className="text-muted-foreground text-sm">Health information and medical service coordination.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-strong transition-shadow" data-testid="card-service-citizen">
              <h3 className="text-lg font-semibold text-foreground mb-2">Citizen Services</h3>
              <p className="text-muted-foreground text-sm">Document services, applications, and citizen support.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-strong transition-shadow" data-testid="card-service-business">
              <h3 className="text-lg font-semibold text-foreground mb-2">Business Services</h3>
              <p className="text-muted-foreground text-sm">Business registration, licenses, and regulatory support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;