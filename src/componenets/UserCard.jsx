const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
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
          <button className='btn btn-error'>Ignore</button>
          <button className='btn btn-success'>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
