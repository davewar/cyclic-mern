import React, { useState, useContext, useEffect } from 'react';

import {useParams}from 'react-router-dom'

const ActivateAccount = () => {

    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    // /activation
    const {id} = useParams()
    console.log(id);

    const validate = async (id)=>{
       

                try {

                    const res = await fetch('/user/activation', { 
                    method: 'POST', 
                    body: JSON.stringify({accesstoken: id}),
                    headers: {'Content-Type': 'application/json', credentials: 'include' }
                    });

                    const data = await res.json();                
                    console.log(data);
                   

                    if(data.errors){
                            setErr(data.errors)

                    } else{

                         setSuccess(data.msg)
                    }

        
                 } catch (err) {
                        console.log(err.message);
                        setErr(err.message)
                 }

    
  }

    

    useEffect(() => {
        let isActive = true
            validate(id)

        return ()=> isActive= false
    }, [id])


    return (
        <div className="alert">
          <p className="text-danger">{err}</p>
          <p className="text-success">{success}</p>
        </div>
    )
}

export default ActivateAccount
