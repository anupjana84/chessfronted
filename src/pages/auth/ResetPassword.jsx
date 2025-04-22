import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoginLayout from "../../layouts/LoginLayout";
import { FaChessKing } from "react-icons/fa6";
import { GiChessKing } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess, toastWarn } from "../../utils/notifyCustom";
import { z } from "zod";
import { postApiWithFormdata } from "../../utils/api";
import Loader from "../../layouts/components/Loader";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    confirmPassword: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_URL}`;
    try {
      setLoading(true);
      // Validate form data against the schema
      const validatedData = resetPasswordSchema.parse(formData);
      // console.log('Valid data:', validatedData);
      const res = await postApiWithFormdata(url, validatedData);
      // console.log(res.data,"kkkkkkkk");

      if (res.data.success) {
        toastSuccess("Password reset Successfull");
      }
      navigate("/login2");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into an object and update state
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});

        setErrors(formattedErrors);
        console.log("Validation Errors:", formattedErrors);
      } else {
        console.error("Unexpected Error:", error);
        toastWarn("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout>
      <div className="relative flex items-center justify-center min-h-screen bg-black">
        <div className="absolute inset-0 bg-[url('./assets/chessBoard/fc623ca7-adde-492b-a4f8-48755ec8b861.webp')] bg-cover bg-center opacity-40"></div>
        <div className="relative bg-black/[0.1] backdrop-blur-md border border-yellow-500 shadow-[0px_0px_20px_5px_rgba(255,215,0,0.5)] rounded-lg p-8 w-96 text-center">
          <h2 className="text-yellow-400 text-4xl  flex-col font-bold font-serif mb-6 flex justify-center items-center">
            <GiChessKing size={40} /> Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative flex items-center">
                <FaChessKing
                  className="absolute left-3 text-yellow-400"
                  size={20}
                />
                <input
                  onChange={handleChange}
                  className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-yellow-500 focus:ring-yellow-400"
                  }`}
                  type="password"
                  name="password"
                  placeholder="Enter  password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 pl-1 text-left text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="mb-6">
              <div className="relative flex items-center">
                <FaChessKing
                  className="absolute left-3 text-yellow-400"
                  size={20}
                />
                <input
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-yellow-500 focus:ring-yellow-400"
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm the password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 pl-1 text-left text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-yellow-500  text-white font-semibold rounded transition duration-300 shadow-[0px_0px_15px_3px_rgba(255,215,0,0.8)] hover:scale-105"
            >
              {loading ? <Loader /> : "Reset"}
            </button>
          </form>
        </div>
      </div>
    </LoginLayout>
  );
}
