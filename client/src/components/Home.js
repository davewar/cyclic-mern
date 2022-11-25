import React from 'react'


const Home = () => {

        return (

            
        <div classNameName="container">

            <div className="row">
                <div className="col-xs-12">

            <h1 classNameName="text-center mt-5 " >Welcome to my fullstack website</h1>

            <h5 className="mt-5">FrontEnd</h5>

            <ul className="list-unstyled">
                <li>- React</li>
                <li>- Bootstrap</li>
                <li>- Paypal</li>
                <li>- Login/Register </li>
                <li>- Admin user - Add / Delete / Amend Products</li>
                <li>- Activate account by validating email address of user (Nodemailer)</li> 
                <li>- Password Reset (Nodemailer)</li>
                <li>- Account locked - password incorrect three times in a row</li>
            </ul>

            <h5 className="mt-5">BackEnd</h5>
            <ul className="list-unstyled">
                <li>- NodeJS</li>
                <li>- Express</li>
                <li>- MongoDB</li>
                <li>{`- JWT AccessToken && RefreshToken + HTTP only cookie`}</li>
               
            </ul>

            <button className="btn btn-primary" onClick={()=>{
                window.open("https://github.com/davewar/React_shop_Nodemailer")
            }}>GitHub Code</button>

            </div>
           </div>
            
        </div>
       
       
    )
}

export default Home
