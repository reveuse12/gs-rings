import { useState } from "react";
import { Menu, MenuIcon, X } from "lucide-react";

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
      <div className="w-full bg-[#FAF1D8] py-2">
        <p className="text-center text-sm text-white">
          Use code WELCOME10 for 10% off your first purchase
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:h-20">
          <a
            href="/"
            className="hidden lg:flex items-center left-0 space-x-2 py-4"
          >
            <img
              src="/SmallLogo.png"
              alt="Gem Star Logo"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </a>
          <div className="flex  w-full lg:flex-col lg:items-center lg:justify-between">
            {/* Logo and Mobile Menu Section */}
            <div className="flex w-full items-center justify-between lg:w-auto relative z-50">
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
                className="lg:hidden text-black"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <i className="fas fa-times text-lg" />
                ) : (
                  <i className="fas fa-bars text-lg" />
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
          </div>

          <div className="hidden lg:flex items-center left-0 space-x-2 py-4"></div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="fixed inset-0 top-20 bg-white lg:hidden">
              <div className="flex flex-col space-y-4 py-4">
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
