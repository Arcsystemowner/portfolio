import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-dark-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <span className="font-mono text-lg font-bold gradient-text">&lt;AY /&gt;</span>

          {/* Copyright */}
          <p className="text-sm text-slate-500 flex items-center gap-1.5 order-last sm:order-none">
            © {year} Archit Yadav — Built with{' '}
            <FiHeart size={13} className="text-rose-400" /> using React &amp; Tailwind
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: <FiMail size={16} />, href: 'mailto:archit.yadav@email.com', label: 'Email' },
              { icon: <FaLinkedin size={16} />, href: 'https://linkedin.com/in/archityadav', label: 'LinkedIn' },
              { icon: <FaGithub size={16} />, href: 'https://github.com/archityadav', label: 'GitHub' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white
                           border border-white/5 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
