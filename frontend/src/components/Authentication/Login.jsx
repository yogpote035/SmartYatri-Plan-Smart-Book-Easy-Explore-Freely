import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../ReduxState/Authentication/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      password: formData.password,
      ...(usePhone ? { phone: formData.phone } : { email: formData.email }),
    };

    const result = await dispatch(login(payload));
    if (!result.error) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-indigo-600 mb-6">
          Login to SmartYatri
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!usePhone ? (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md outline-none"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md outline-none"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md pr-10 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[38px] right-3 text-gray-600 hover:text-indigo-600"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className={`w-full ${
              loading ? "bg-indigo-300" : "bg-indigo-600"
            } text-white font-semibold py-2 rounded-md hover:bg-rose-800 transition-colors`}
          >
            {loading ? "Validating Credentials..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500">
            {usePhone ? "Prefer email login?" : "Prefer phone login?"}{" "}
            <button
              type="button"
              onClick={() => setUsePhone(!usePhone)}
              className="text-indigo-600 hover:underline font-medium"
            >
              Switch to {usePhone ? "Email" : "Phone"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
