import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[70vh] pt-8 pb-20">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
            card: 'bg-white border border-gray-200 shadow-lg',
            headerTitle: 'text-gray-900',
            headerSubtitle: 'text-gray-600',
            socialButtonsBlockButton: 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100',
            formFieldLabel: 'text-gray-700',
            formFieldInput: 'bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500',
            footerActionLink: 'text-blue-600 hover:text-blue-700'
          }
        }} />
      </div>
      <Footer />
    </div>
  );
}
