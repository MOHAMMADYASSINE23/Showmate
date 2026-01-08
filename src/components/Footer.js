import Logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8 md:gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="https://showmate.com" className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <img src={Logo} className="h-8" alt="Showmate Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Showmate</span>
            </a>
            <p className="text-gray-300 text-sm max-w-md">
              Your ultimate movie companion. Discover, watch, and enjoy the best films from around the world.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-sm">
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              </li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="hover:text-blue-400 transition-colors">Licensing</a>
              </li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-600 lg:my-8" />
        <div className="text-center text-sm text-gray-300">
          © 2025 <a href="https://showmate.com" className="hover:text-blue-400 transition-colors">Showmate™</a>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}



