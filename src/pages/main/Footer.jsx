import React from "react";



const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-[url('/images/footer.png')] bg-cover bg-center w-full h-auto text-white relative"
    >
      {/* Background */}
      <div className="bg-black/70 w-full h-full px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Social links */}
        <div className="flex flex-col gap-4 text-xl">
          
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:underline"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H8.282v-2.888h2.156V9.797c0-2.138 1.278-3.319 3.233-3.319.936 0 1.915.171 1.915.171v2.096h-1.079c-1.063 0-1.394.662-1.394 1.34v1.609h2.377l-.38 2.888h-1.997v6.99C18.343 21.128 22 16.991 22 12z" />
            </svg>
            <span>Facebook</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-pink-600 hover:underline"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.345 3.608 1.32.975.975 1.258 2.242 1.32 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.345 2.633-1.32 3.608-.975.975-2.242 1.258-3.608 1.32-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.345-3.608-1.32-.975-.975-1.258-2.242-1.32-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.345-2.633 1.32-3.608.975-.975 2.242-1.258 3.608-1.32C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.015 7.052.072 5.772.128 4.637.444 3.678 1.403.719 2.362.403 3.497.347 4.777.29 6.058.275 6.467.275 12s.015 5.942.072 7.223c.056 1.28.372 2.415 1.331 3.374.96.959 2.095 1.275 3.375 1.331C8.332 23.985 8.741 24 12 24s3.668-.015 4.948-.072c1.28-.056 2.415-.372 3.375-1.331.959-.96 1.275-2.095 1.331-3.374.057-1.281.072-1.69.072-7.223s-.015-5.942-.072-7.223c-.056-1.28-.372-2.415-1.331-3.375-.96-.959-2.095-1.275-3.375-1.331C15.668.015 15.259 0 12 0z" />
              <circle cx="12" cy="12" r="3.6" />
              <circle cx="18.406" cy="5.595" r="1.439" />
            </svg>
            <span>Instagram</span>
          </a>

          {/* Messenger */}
          <a
            href="https://www.messenger.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:underline"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 3.1 1.27 5.9 3.32 7.94V22l3.04-1.66A9.92 9.92 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.99 14.23-2.48-2.66-5.17 2.66 6.54-7.06 2.48 2.66 5.17-2.66-6.54 7.06z" />
            </svg>
            <span>Messenger</span>
          </a>
        </div>

        {/* Policy & Copyright */}
        <div className="text-lg flex flex-col justify-center items-center my-10 md:my-0">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <div className="text-center text-xs mt-2">&copy; 2024 Onkore. All rights reserved.</div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-4 text-lg mt-6 md:mt-0">
          <div>
            <div className="text-xl font-semibold">Email</div>
            <div className="italic">● OnkoreInfo@gmail.com</div>
          </div>
          <div>
            <div className="text-xl font-semibold">Kontakt</div>
            <div className="italic">● 696 100 061</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
