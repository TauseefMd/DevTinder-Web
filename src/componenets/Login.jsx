import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!");
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!!");
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center py-10'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-3xl justify-center'>
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div>
            {!isLoginForm && (
              <>
                <fieldset className='fieldset my-2'>
                  <legend className='fieldset-legend'>First Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className='fieldset my-2'>
                  <legend className='fieldset-legend'>Last Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className='fieldset my-2'>
              <legend className='fieldset-legend'>Email Id</legend>
              <input
                type='text'
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className='fieldset my-2'>
              <legend className='fieldset-legend'>Password</legend>
              <input
                type='password'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className='card-actions justify-center m-2'>
            <button
              className='btn btn-primary'
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className='m-auto cursor-pointer py-2 text-sky-500'
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User? Sign Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
