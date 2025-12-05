import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
    user;
  const dispatch = useDispatch();

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='card bg-base-300 w-96 shadow-sm'>
      <figure>
        <img src={photoUrl} alt='user-photo' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " , " + gender}</p>}
        <p>{about}</p>
        {skills?.length && <p>{skills.toString()}</p>}
        <div className='card-actions justify-between my-4'>
          <button
            className='btn btn-error'
            onClick={() => sendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className='btn btn-success'
            onClick={() => sendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
