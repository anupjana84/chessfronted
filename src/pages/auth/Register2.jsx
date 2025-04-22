import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaChessKing } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiChessKing } from "react-icons/gi";
import { toastSuccess, toastWarn, toastError } from "../../utils/notifyCustom";
import { postApiWithFormdata } from "../../utils/api";
import { RegisterSchema } from "../../utils/zodSchemas";
import { z } from "zod";
import { data } from "autoprefixer";
import { FaAngleDown } from "react-icons/fa6";
import Loader from "../../layouts/components/Loader";

export default function Register2() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    country: "",
    referalCode: "",
  });
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryData);
        setFilteredCountries(countryData);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
    setShowDropdown(true);
  };

  const handleSelect = (country) => {
    setSelectedCountry(country.name);
    setSearch(country.name);
    setShowDropdown(false);
    setFormData((prevData) => ({
      ...prevData,
      country: country.name,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validatedData = RegisterSchema.parse(formData);
      const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_REGISTER}`;
      const response = await postApiWithFormdata(url, validatedData);

      if (response.data.success) {
        toastSuccess("Register Successful");
        localStorage.setItem(
          "chess-user-token",
          JSON.stringify(response?.data?.data?.token)
        );
        localStorage.setItem(
          "User Detail",
          JSON.stringify(response?.data?.data)
        );
        navigate("/");
        window.location.reload(false);
      } else {
        toastError(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        toastError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 bg-[url('./assets/chessBoard/fc623ca7-adde-492b-a4f8-48755ec8b861.webp')] bg-cover bg-center opacity-40"></div>
      <div className="relative bg-black/[0.1] backdrop-blur-md border border-yellow-500 shadow-[0px_0px_20px_5px_rgba(255,215,0,0.5)] rounded-lg p-8 w-96 text-center">
        <h2 className="text-yellow-400 text-4xl flex-col font-bold font-serif mb-6 flex justify-center items-center">
          <GiChessKing size={40} />
          Register
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
                value={formData.name}
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                type="text"
                name="name"
                placeholder="Enter Name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 pl-1 text-left text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative flex items-center">
              <FaChessKing
                className="absolute left-3 text-yellow-400"
                size={20}
              />
              <input
                onChange={handleChange}
                value={formData.mobile}
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.mobile
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                type="tel"
                name="mobile"
                placeholder="Enter Phone Number"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 pl-1 text-left text-sm mt-1">
                {errors.mobile}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative flex items-center">
              <FaChessKing
                className="absolute left-3 text-yellow-400"
                size={20}
              />
              <input
                onChange={handleChange}
                value={formData.email}
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                type="text"
                name="email"
                placeholder="Enter Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 pl-1 text-left text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <div className="relative flex items-center">
              <FaChessKing
                className="absolute left-3 text-yellow-400"
                size={20}
              />
              <input
                onChange={handleChange}
                value={formData.password}
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter  password"
              />
              <button
                type="button"
                className="absolute right-3 flex items-center text-yellow-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 pl-1 text-left text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="relative w-80 mx-auto mb-4">
            <div className="relative flex items-center">
              <FaChessKing
                className="absolute left-3 text-yellow-400"
                size={20}
              />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Select country"
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.country
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                onFocus={() => setShowDropdown(true)}
              />
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setShowDropdown(!showDropdown);
                }}
                className="absolute right-3 text-yellow-300"
              >
                <FaAngleDown size={20} />
              </button>
            </div>
            {showDropdown && filteredCountries.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-400 rounded mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(country)}
                    className="flex items-center gap-3 p-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-6 h-4 rounded"
                    />
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4 ">
            <div className="relative flex items-center">
              <FaChessKing
                className="absolute left-3 text-yellow-400"
                size={20}
              />
              <input
                onChange={handleChange}
                value={formData.referalCode}
                className={`w-full pl-10 p-3 text-yellow-300 bg-transparent border rounded focus:outline-none focus:ring-2 transition ${
                  errors.referalCode
                    ? "border-red-500 focus:ring-red-500"
                    : "border-yellow-500 focus:ring-yellow-400"
                }`}
                type="text"
                name="referalCode"
                placeholder="Enter Referal Code"
              />
            </div>
            {errors.referalCode && (
              <p className="text-red-500 pl-1 text-left text-sm mt-1">
                {errors.referalCode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500  text-white font-semibold rounded transition duration-300 shadow-[0px_0px_15px_3px_rgba(255,215,0,0.8)] hover:scale-105"
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </form>
        <div className="text-center mt-2">
          <Link
            to="/login2"
            className="text-[#FFD700] text-sm font-semibold hover:text-white transition-all duration-300"
          >
            Already checkmated? Log in!
          </Link>
        </div>
      </div>
    </div>
  );
}
