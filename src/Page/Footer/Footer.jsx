import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
       <div>
  {/* Top Footer */}
  <footer className="footer sm:footer-horizontal p-10 bg-black text-white">
    
    {/* Platform */} 
    <nav>
      <h6 className="footer-title">Platform</h6>
      <Link to='/public-lessons' className="link link-hover">Life Lessons</Link>
      <a className="link link-hover">Featured Lessons</a>
      <a className="link link-hover">Top Contributors</a>
    </nav>

    {/* Legal */}
    <nav>
      <h6 className="footer-title">Legal</h6>
      <Link to='/privacy-policy' className="link link-hover">Privacy Policy</Link>
      <Link to='/terms-conditions' className="link link-hover">Terms & Conditions</Link>
    </nav>
      {/* Community */}
    <nav>
      <h6 className="footer-title">Community</h6>
      <Link to='/about' className="link link-hover">About Us</Link>
      <Link to='/contact' className="link link-hover">Contact</Link>
    </nav>
  </footer>

  {/* Bottom Footer */}
  <footer className="footer border-base-300 border-t px-10 py-4 bg-black text-white">
    
    {/* Branding */}
    <aside className="grid-flow-col items-center gap-3">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.5 7 12 4.5 19.5 7 12 9.5zm0 3L2 17l10 5 10-5-10-5z" />
      </svg>

      <p>
        <Link to="/" className="font-semibold">Digital Life Lessons</Link>
        <br />
        Learn from real experiences • Grow every day
      </p>
    </aside>

    {/* Social Icons */}
     <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link to='https://www.linkedin.com/in/md-arafat-alam-abir/'>
              <FaLinkedin className='text-2xl'></FaLinkedin>
            </Link>
            
            <Link to='https://www.facebook.com/arafatalom.abir.1'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </Link>
            <Link to='https://github.com/abir-11' className=''><FaGithub  className='text-2xl'/></Link>
          </div>
        </nav>

  </footer>
</div>

    );
};

export default Footer;