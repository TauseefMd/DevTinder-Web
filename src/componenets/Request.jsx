import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevived", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className='flex justify-center my-10'>
        <h1 className='text-bold tect-2xl'>No Request found!!!</h1>
      </div>
    );

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-white text-4xl'>Connection Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'
            key={request._id}
          >
            <div className='flex'>
              <img
                alt='photo'
                className='w-20 h-20 rounded-full'
                src={photoUrl}
              />
              <div className='text-left mx-4'>
                <h2 className='font-bold text-xl'>
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>

            <div>
              <button className='btn btn-primary mx-2'>Reject</button>
              <button className='btn btn-secondary mx-2'>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
