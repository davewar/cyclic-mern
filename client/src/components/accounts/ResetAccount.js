import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UserContext} from '../../contexts/user'



const ResetAccount = () => {

    const {setAccessToken} = useContext(UserContext);    //global user
    //   const history = useHistory()    

    const [signInErr, setSignInErr] = useState("")
    const [success, setSuccess] = useState('')

    const [email, setemail] = useState('');
    const [emailErr, setemailErr] = useState('');
    

   

    const handleChange = (e, name) => {

        //clear
      setSignInErr("")
      setSuccess("")
      setemailErr("")

    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
  
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email && !emailErr) {

          //clear         
          setSignInErr("")
          setSuccess("")
      

        
    try {
      const res = await fetch('/user/forgot', { 
        method: 'POST', 
        body: JSON.stringify({ email }),
        headers: {'Content-Type': 'application/json',
                credentials: 'include'
                }
           
      });
      const data = await res.json();
      // console.log(data);

      if (data.errors) {            
            setSignInErr(data.errors)
           
            
      } else{

        setSuccess(data.msg)
      }
    

    }
    catch (err) {
      console.log(err);
      setSignInErr(err.message)
    }

    }
  }

  return (
   
    <div className="container ">

        <div className="row mt-5  justify-content-center align-items-center  " >

          <div className="col-xs-12  sign-in" >

                    <h2 className="text-start mt-3">Forgot Password</h2>
                    {signInErr && <div className="alert alert-danger text-center">
                      <span className="text-danger text-capitalize">{signInErr}</span>
                    </div>}
                    {success && <div className="alert alert-success text-center">
                      <span className="text-success text-capitalize">{success}</span>
                    </div>}

                    <form className="mt-4 " onSubmit={handleSignIn}>
                      <div className="form-group">
                            <label className="mr-3" htmlFor="email">Enter Email Address</label>
                            <input
                              type="email"
                              name="email"
                              className={ emailErr ? "form-control is-invalid":
                                    !emailErr && email.length ? "form-control is-valid":"form-control"
                                }
                          
                              id="email"
                              placeholder="Email Address"
                              required
                              autoComplete="on"
                              onChange={(e) => handleChange(e, 'email')}
                            />
                            {emailErr && <small className="text-danger">{emailErr}</small>}
                      </div>

                      
                      <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                    <p className="float-left mt-5">    
                          Back to<Link to='/signin'>Sign in</Link>
                    </p>

                    

                </div>    

        </div>
  
    </div>
  )
}

export default ResetAccount
