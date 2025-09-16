import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 animate-fade-in">
              <Logo variant="full" size="md" />
            </div>
            <p className="text-gray-600 max-w-md mb-4 leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
              Your ultimate companion for wilderness adventures in Thailand. Plan trips, navigate safely, and discover amazing outdoor destinations from Doi Inthanon to Erawan Falls with AI-powered guidance.
            </p>
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link href="#" className="w-10 h-10 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center text-primary-600 hover:text-primary-700 transition-colors-transform duration-300 hover:scale-110">
                <Icon name="mail" size={16} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center text-primary-600 hover:text-primary-700 transition-colors-transform duration-300 hover:scale-110">
                <Icon name="user" size={16} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center text-primary-600 hover:text-primary-700 transition-colors-transform duration-300 hover:scale-110">
                <Icon name="camera" size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="map" size={16} className="text-primary-600" />
              <span>Explore</span>
            </h3>
            <nav className="space-y-2">
              <Link href="/plan" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Plan Your Trip
              </Link>
              <Link href="/navigate" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Navigate Trails
              </Link>
              <Link href="/chat" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                AI Assistant
              </Link>
              <Link href="/profile" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Your Profile
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="shield" size={16} className="text-primary-600" />
              <span>Support</span>
            </h3>
            <nav className="space-y-2">
              <Link href="#" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Safety Guidelines
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Emergency Contacts
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Help Center
              </Link>
              <Link href="#" className="block text-gray-600 hover:text-primary-500 transition-colors duration-300 py-1 hover:translate-x-1 transform">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} WildGuide. Made with <Icon name="heart" size={12} className="inline text-red-500" /> for outdoor enthusiasts.
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-primary-500 transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-500 transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="hover:text-primary-500 transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
