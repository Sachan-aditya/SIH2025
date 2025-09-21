const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
            About Our Platform
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-description">
            Building a digital bridge between government services and citizens with transparency, accessibility, and efficiency at the core.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To provide a simple, accessible, and efficient digital platform that serves all citizens with equal opportunity and transparency. 
              We believe in the power of technology to transform governance and improve the lives of people.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform is designed following Indian government standards for digital accessibility, ensuring that every citizen, 
              regardless of their technical background or abilities, can access and benefit from digital government services.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8" data-testid="text-values-title">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4" data-testid="card-value-accessibility">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Accessibility First</h3>
              <p className="text-muted-foreground">
                Every feature is designed to be accessible to all citizens, including those with disabilities and limited technical skills.
              </p>
            </div>

            <div className="space-y-4" data-testid="card-value-transparency">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Complete Transparency</h3>
              <p className="text-muted-foreground">
                Open processes and clear communication ensure citizens understand how their government serves them.
              </p>
            </div>

            <div className="space-y-4" data-testid="card-value-efficiency">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Maximum Efficiency</h3>
              <p className="text-muted-foreground">
                Streamlined processes and intuitive design reduce time and effort required for government interactions.
              </p>
            </div>

            <div className="space-y-4" data-testid="card-value-security">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Trusted Security</h3>
              <p className="text-muted-foreground">
                Government-grade security protects citizen data while maintaining privacy and confidentiality.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <div className="bg-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-team-title">
              Built by Team Udaan
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Team Udaan is committed to creating digital solutions that empower citizens and improve governance. 
              We combine technical expertise with deep understanding of public service requirements to build platforms 
              that truly serve the people.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;