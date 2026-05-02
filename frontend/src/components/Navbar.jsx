import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#powerful-features', isHash: true },
    { label: 'Templates', href: '/sign-up', isHash: false },
    { label: 'Pricing', href: '/pricing', isHash: false },
  ];

  const handleNavClick = (link) => {
    if (link.isHash) {
      // Handle hash navigation (Features, Pricing)
      if (window.location.pathname === '/') {
        // Already on home page, scroll to section
        const hash = link.href.substring(2); // Remove the leading '/#'
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Not on home page, navigate to home with hash
        navigate(link.href);
      }
    } else {
      // Regular navigation (Templates -> sign-up)
      navigate(link.href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'glass-nav shadow-lg shadow-black/5'
        : 'bg-transparent'
        }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/sign-in" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="ResumeForge Pro" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-dark tracking-tight">
              ResumeForge<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors duration-150 ${location.pathname === link.href || (link.isHash && location.pathname === '/')
                  ? 'text-primary'
                  : 'text-stone-600 hover:text-dark'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="px-5 py-2.5 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200"
                >
                  Dashboard
                </button>
                <UserButton afterSignOutUrl="/sign-in" />
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="px-5 py-2.5 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/sign-up')}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-200 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-dark hover:bg-stone-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-stone-100">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleNavClick(link);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.href || (link.isHash && location.pathname === '/')
                      ? 'text-primary bg-primary-50'
                      : 'text-stone-600 hover:text-dark hover:bg-stone-50'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                  {isSignedIn ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/sign-in');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-all"
                      >
                        Dashboard
                      </button>
                      <div className="flex justify-center py-2">
                        <UserButton afterSignOutUrl="/sign-in" />
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate('/sign-in');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-all"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          navigate('/sign-in');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
                      >
                        Get Started
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
