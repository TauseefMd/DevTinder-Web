import { useSelector } from "react-redux";
import EdutProfile from "./EdutProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return <div>{user && <EdutProfile user={user} />}</div>;
};

export default Profile;
