## Stack

FrontEnd:

- React
- Bootstrap
- Paypal
- Login/Register
- Admin user - Add / Delete / Amend Products
- Activate account by validating email address of user (Nodemailer)
- Password Reset (Nodemailer)
- Account locked - password incorrect three times in a row

BackEnd:

- NodeJS
- Express
- MongoDB
- JWT AccessToken && RefreshToken + HTTP only cookie

## Start

Front:

```
cd app
npm install
npm start
```

Back:

```
cd app/backend
npm install
npm run seedData      * <=== Adds data to MonbgoDB database - only run once otherwise you will have duplicate items *
npm start
```

React runs on : http://localhost:3000

Backend runs on : http://localhost:5000

```
PayPal:
Set up account @
https://developer.paypal.com/classic-home/

Create Personal and business account to test payments:
https://sandbox.paypal.com/



```
