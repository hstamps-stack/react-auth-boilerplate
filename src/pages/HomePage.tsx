import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const HomePage = () => {
  const {getUsers,users} = useContext(GlobalContext);

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div id='home'>
      <div className='row text-center mt-5'>
        <div className='col'>
          <h2>Welcome to some really cool startup</h2>
          <h4 className='text-secondary'>
            Take a look at some of our other users!
          </h4>
        </div>
      </div>
      <div className='row text-center'>
        <div className='col-6 offset-3'>
          <ul className='list-unstyled d-flex flex-wrap justify-content-evenly text-center'>{users?.map((user:User,i:number)=>{
            return(
              <div className ="align-items-center m-3" key={i}>
                 {user.firstName} {user.lastName}
              </div>
             
            )
          })}</ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
