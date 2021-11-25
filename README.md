# Footprint (eCommerce project made with React.js)

Footprint is an eCommerce project for selling footwear.

Tech used for this project: React.js, SCSS for styling, Firebase for realtime database and authentication.

## Features

1. Product preview, filtering, sorting
2. Add products to cart, remove from cart
3. Add products to favourites, remove from favourites
4. User authentication with firebase
5. Project is a single-page app

## How to use

Follow these steps to run the project locally:

1. Clone this repository 
2. Run "npm install" command
3. Set up the following environmental variables:
```
REACT_APP_DATABASE_URI=<Create a Firebase project. Go to Realtime Database section. Copy the URI. Set database editing rules to TRUE>
REACT_APP_WEB_API_KEY=<Firebase -> Project Settings -> General -> Web API key>
```
4. Activate Firebase authentication with email/password provider 
5. Run "npm start" command from the terminal 
