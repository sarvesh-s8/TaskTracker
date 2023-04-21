const Footer = () => {
  return (
    <footer className="items-center justify-between px-2 py-3 bg-violet-700 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Task Tracker
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>

            <li>
              <a href="/license" className="mr-4 hover:underline md:mr-6 ">
                License
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="http://localhost:3000/" className="hover:underline">
            Task Tracker™{" "}
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
