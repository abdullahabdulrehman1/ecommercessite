import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";
import { useState } from "react";
// import { useAuth } from "../../../context/authRoute";
import axios from "axios";
import { toast } from "react-toastify";
import url from "../../../utils/exporturl";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [trueerror, settrueError] = useState("");
  const location = useLocation();
  //   const [auth, setauth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    newpassword: "",
    question: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, question, newpassword } = formData;
    if (!email || !newpassword || !question) {
      toast.error("Please fill in all fields.");
      settrueError("Please fill in all fields.");
      return;
    }

    const data = {
      email,
      newpassword,
      question,
    };
    try {
      const res = await axios.post(
        `${url}/auth/forgot-password`,
        formData
      );
      if (res && res.data) {
        settrueError(`${res.data.message}`);
        setTimeout(() => {
          settrueError("");
        }, 2000);
        // setauth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        // localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Password Changed Successfully");
        // setError(`${res.data.message}`);
        // if (location.state && location.state.from === "/dashboard") {
        //   navigate("/dashboard");
        // } else {
          navigate("/login");
        // }
      } else {
        setError(`${res.data.message}`);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError(`${res.data.message}`);
      setTimeout(() => {
        setError("");
      }, 2000);
      console.log({ error });
    }
  };

  return (
    // <div>ForgotPassword</div>
    <Layout title={"Forgot Password | Ecommerce"}>
      <div className="dark:bg-gray-900  light:bg-white-500">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto md:h-5/6 md:my-20 lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6  text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2 rounded-3xl"
              src="/public/aboutus.jpg"
              alt="logo"
            />
            Ecommerce
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    typeof="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    value={formData.newpassword}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Security Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>

                {trueerror ? (
                  <div className="text-green-500 text-lg font-bold">
                    {trueerror}
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-lg font-bold">{error}</div>
                ) : null}

                <div>
                  <button
                    type="submit"
                    // value={submit}

                    // onClick={handleSubmit}
                    className="w-full py-3 text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ForgotPassword;
