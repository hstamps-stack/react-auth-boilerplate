import { useState, useEffect, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegistrationPage = () => {
  const { error, loading,userRegistration,alert } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<User>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
  })
  const [submitted, setSubmitted] = useState(false)
 
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userRegistration(formValues);
   
    setSubmitted(true)
    
     setTimeout(()=>{
      setSubmitted(false)
    },5000);


  };


  return (
    <div id='home'>
      {submitted && !loading?(
      <div className="alert alert-primary mt-2 text-center" role="alert">
        {alert}
      </div>):null}
      <div className='row my-5 text-center'>
        <div className='col'>
          <h1>Register Now to Join our App!</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <form action=''>
            <div className='form-group my-3'>
              <input
                type='text'
                className='form-control'
                placeholder='First Name'
                value={formValues.firstName}
                onChange={e => setFormValues({...formValues,firstName: e.target.value})}
              />
            </div>
            <div className='form-group my-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Last Name'
                value={formValues.lastName}
                onChange={e => setFormValues({...formValues,lastName: e.target.value})}
              />
            </div>
            <div className='form-group my-3'>
              <input type='text' className='form-control'
               placeholder='Email'
               value={formValues.email}
               onChange={e => setFormValues({...formValues,email: e.target.value})}
                />
            </div>
            <div className='form-group my-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={formValues.password}
                onChange={e => setFormValues({...formValues,password: e.target.value})}
              />
            </div>
            <div className='d-grid'>
              <button
                className='btn btn-primary btn-block'
                onClick={handleSubmit}>
                 {loading ? (
                  <div
                    className='spinner-border spinner-border-sm'
                    role='status'>
                    <span className='visually-hidden'>Loading</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
          <div className='text-center text-danger mt-3'>{error}</div>
        </div>
      </div>
      <div className='row my-3 text-center'>
        <div className='col-sm-12 col-md-6 offset-md-3'>
          <div>
            Already registered?{' '}
            <Link to='/auth/login'>Click here to Login!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
