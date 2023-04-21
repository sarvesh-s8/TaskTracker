import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function Register() {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { name, email, password } = userState;
    try {
      const { data } = await axios.post("/api/auth/register", {
        email,
        password,
        name,
      });
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
          Register
        </h1>
        <form className="mt-6" onSubmit={onSubmitForm}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="name"
              value={userState.name}
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
              value="Register"
              type="submit"
            />
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account ?
          <a
            href="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
