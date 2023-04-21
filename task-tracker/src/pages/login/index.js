import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Login() {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { email, password } = userState;
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      console.log(data);
      toast.success(data.message);
      localStorage.setItem("x-auth-token", data.data.token);
      localStorage.setItem("userId", data.data.user._id);
      router.push("/dashboard");
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={onSubmitForm}>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              value={userState.email}
              onChange={(e) =>
                setUserState({
                  ...userState,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              value={userState.password}
              onChange={(e) =>
                setUserState({
                  ...userState,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-6">
            <input
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              value="Login"
              type="submit"
            />
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <a
            href="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
