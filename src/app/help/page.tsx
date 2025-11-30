import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-8 pb-20 container min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 gradient-text">How can we help?</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-4">Sales Inquiry</h3>
          <p className="text-gray-400 mb-4">Questions about our services or pricing?</p>
          <a href="mailto:sales@abecsa.in" className="text-primary hover:text-white transition-colors">sales@abecsa.in</a>
        </div>

        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-4">Technical Support</h3>
          <p className="text-gray-400 mb-4">Need help with your existing website?</p>
          <a href="mailto:support@abecsa.in" className="text-primary hover:text-white transition-colors">support@abecsa.in</a>
        </div>

        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-4">WhatsApp Us</h3>
          <p className="text-gray-400 mb-4">Chat with us directly for quick support.</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-sm">
            Chat Now
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
