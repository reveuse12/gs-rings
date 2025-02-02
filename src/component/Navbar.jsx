import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "ENGAGEMENT RINGS", href: "/engagement-rings" },
  { name: "WEDDING RINGS", href: "/wedding-rings" },
  { name: "DIAMONDS", href: "/diamonds" },
  { name: "GEMSTONES", href: "/gemstones" },
  { name: "JEWELRY", href: "/jewelry" },
  { name: "GIFTS", href: "/gifts" },
  { name: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full mb-2">
      <div className="w-full bg-[#E4B45F] py-2">
        <p className="text-center text-sm text-white">
          Use code WELCOME10 for 10% off your first purchase
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between lg:h-20">
          {/* Logo and Mobile Menu Section */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            <a href="/" className="flex items-center space-x-2 py-4">
              <img
                src="/HeaderLogo.png"
                alt="Gem Star Logo"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden w-full items-center justify-center lg:flex">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-900 hover:text-[#E4B45F]"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="w-full lg:hidden">
              <div className="flex flex-col space-y-4 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-center text-sm font-medium text-gray-900 hover:text-[#E4B45F]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
