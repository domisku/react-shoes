# Footprint (eCommerce project made with React.js)

Footprint is an eCommerce project for selling footwear.

Tech used for this project: React.js, Redux, SCSS for styling, Firebase for realtime database and authentication.

## Features

1. Product preview, filtering, sorting
2. Add products to cart, remove from cart
3. Add products to favourites, remove from favourites
4. User authentication with firebase
5. Project is a single-page app

## Preview  

Preview deployed project on [Vercel](https://footprint-blush.vercel.app/)  

![Home page](https://user-images.githubusercontent.com/84922120/144010775-6d907102-f2eb-4cd7-9f84-ba2e7179b5f8.png)

![Products page](https://user-images.githubusercontent.com/84922120/144010787-2ebaab18-5e0d-495b-b3b3-a85caf5af48a.png)

![Product details page](https://user-images.githubusercontent.com/84922120/144010790-6efd18ad-ff55-4614-9581-b3ccb0140fa6.png)

![Favourites page](https://user-images.githubusercontent.com/84922120/144010798-f393c9e6-233f-4d5a-b7c6-2a07a6c924dd.png)

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
