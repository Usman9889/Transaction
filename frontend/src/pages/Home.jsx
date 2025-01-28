import { BottomWarning } from "../components/BottomWarning"

export const Home =() =>{
    return (
    <div className="min-h-screen bg-gray-50">
    {/* Navbar */}
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold text-indigo-600">PayEase</h1>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-indigo-600">
            Features
          </a>
          <a href="#get-started" className="text-gray-700 hover:text-indigo-600">
            Pricing
          </a>
          <a href="/signin" className="text-gray-700 hover:text-indigo-600">
            Signin
          </a>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <section className="bg-indigo-600 text-white">
      <div className="container mx-auto flex flex-col items-center text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Simplify Your Payments with PayEase
        </h2>
        <p className="text-lg mb-6">
          A seamless solution to manage transactions, track expenses, and grow
          your business.
        </p>
        <a
          href="#get-started"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose PayEase?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-indigo-600 mb-4">
              Fast Transactions
            </h4>
            <p className="text-gray-600">
              Process payments in seconds with our reliable infrastructure.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-indigo-600 mb-4">
              Secure Payments
            </h4>
            <p className="text-gray-600">
              Our platform ensures the highest security standards to protect
              your data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-indigo-600 mb-4">
              Easy Integration
            </h4>
            <p className="text-gray-600">
              Connect PayEase with your website or app effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section id="get-started" className="bg-indigo-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
        <a
          href="/signup"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Sign Up Now
        </a>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>© 2025 PayEase. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
};

