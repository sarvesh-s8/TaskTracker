import { useEffect, useState } from "react";
export default function Navbar({ userName }) {
  const [show, setShow] = useState(false);
  const [loginToken, setLoginToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setLoginToken(token);
    } else {
      setLoginToken("");
    }
  }, []);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-violet-700 mb-3">
        <div className="container px-1 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <svg
                className="fill-current h-8 w-8 mr-2"
                width="54"
                height="54"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
              </svg>
              <span className="font-semibold text-xl tracking-tight">
                Task Tracker
              </span>
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setShow(!show)}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" + (show ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!loginToken && (
                <li className="nav-item mx-2">
                  <a
                    href="/register"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0"
                  >
                    Register
                  </a>
                </li>
              )}
              {loginToken ? (
                <>
                  <li className="nav-item mx-2">
                    <a
                      href="/dashboard"
                      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0"
                    >
                      {userName}
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a
                      href="/"
                      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0"
                      onClick={() => {
                        setLoginToken("");
                        localStorage.removeItem("x-auth-token");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item mx-2">
                  <a
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white mt-4 lg:mt-0"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
