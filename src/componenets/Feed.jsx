import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className='flex justify-center my-20'>
        <UserCard user={feed[1]} />
      </div>
    )
  );
};

export default Feed;
