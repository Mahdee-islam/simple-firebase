import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebse.initialize';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();



function App() {
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
  }
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const user = result.user;
      console.log(user);

    })
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleRegistration = e => {
    e.preventDefault();
    console.log(email, password);
    if(password.length < 6) {
      setError('Your password must be at least 6 charecter')
      return;
    }
    if(!/[a-z]/.test(password)) {
      setError('Your password must contain at least one lower case letter.');
      return;
    }
    if(!/[A-Z]/.test(password)) {
      setError('Your password must contain at least one upper case letter.');
      return;
    }

    isLogin ? processLogin(email,password) : resisterNewUser(email, password)
   
   
  }
  const emailChange = e => {
    setEmail(e.target.value);
  }
  const passwordChange = e => {
    setPassword(e.target.value);
  }
  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }
  const resisterNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
      verifyEmail();
    })
    .catch((error) => {
      setError(error.message)
    });
   }
   const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
    })
    .catch(error => {
      setError(error.message);
    })
   }
   const verifyEmail = () => {
    sendEmailVerification (auth.currentUser)
    .then(result => {
      console.log(result);
    })
   }
   const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(result => {
      
    })
   }
  
  return (
    <div className="App">
      <div className="mx-5">
        <h2 className="text-primary">Please {isLogin ? 'Login' : 'Register' } </h2>
      <form onSubmit={handleRegistration}>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={emailChange} type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={passwordChange} type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered?
        </label>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : "Register"}</button>
  <button type="button" onClick={handleResetPassword} className="btn btn-secondary">Reset Password</button>
</form>
<h3 className="text-danger">{error}</h3>
      </div>
      <div>-------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <button onClick={handleFacebookSignIn}>Facebook Signin</button>
      </div>
  )}

export default App;
