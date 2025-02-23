import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (!newPassword) {
      setError("Please provide a new password.");
      return;
    }

    setLoading(true);
    const resetData = { token, newPassword, email };

    try {
      const response = await fetch("http://localhost:2020/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Something went wrong...");
        setLoading(false);
        return;
      }

      setSuccessMessage(result.message || "Password has been successfully reset!");
      setLoading(false);

      // Redirect user to login page after successful reset
      setTimeout(() => {
        navigate("/logowanie");
      }, 2000);
    } catch (error) {
      navigate("/logowanie");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50 px-4 relative">
      <div className="w-full max-w-[90%] sm:max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col justify-between px-6 sm:px-8 pt-6 pb-10 cursor-default">
        <div className="titles text-[40px] sm:text-[50px] text-center mb-6 font-bold text-neonblue drop-shadow-lg">
          {"Resetuj Hasło".split("").map((letter, i) => (
            <span key={i} className="hover:text-neongreen transition-all duration-100">
              {letter}
            </span>
          ))}
        </div>

        <form className="w-full" >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="TwójEmail@email.pl"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-800 font-semibold mb-2">
              Nowe Hasło:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Wprowadź nowe hasło"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>

          {/* Display errors */}
          {error && <p className="text-red-500 text-lg font-bold mb-4">{error}</p>}

          {/* Success Message */}
          {successMessage && <p className="text-green-500 text-lg font-bold mb-4">{successMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white py-2 mt-4 mb-4 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105"
            disabled={loading}
            onClick={handlePasswordReset}
          >
            {loading ? "Resetting..." : "Zresetuj Hasło"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-neonblue underline"
          >
            Already have an account? Log in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
