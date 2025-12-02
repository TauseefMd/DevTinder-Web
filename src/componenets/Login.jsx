import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.error(error);
    }
  };
  return (
    <div className='flex justify-center py-10'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-3xl justify-center'>Login</h2>
          <div>
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
                type='text'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className='card-actions justify-center m-2'>
            <button className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
