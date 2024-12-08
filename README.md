# E-Commerce Application  

An intuitive, feature-rich e-commerce web application that enables users to buy, sell, and manage products seamlessly.  

## Table of Contents  

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation and Setup](#installation-and-setup)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage) 

---

## Features  

### User Roles  
- **Buyer:**  
  - Browse products with details.  
  - Add products to a wishlist.  
  - Manage a shopping cart.  
- **Seller:**  
  - Add, update, and delete their products.  
  - View reviews for their listed products.  

### Functionalities  
- **Wishlist Management:** Save products for later.  
- **Dynamic Cart Management:** Real-time price updates and cart item adjustments.  
- **Product Reviews and Ratings:** View average ratings and number of reviews.  
- **Authentication and Authorization:** Role-based access using sessions and cookies.  

---

## Tech Stack  

- **Frontend:**  
  - [EJS](https://ejs.co) - Embedded JavaScript templates  
  - HTML5, CSS3, and [Bootstrap](https://getbootstrap.com)  

- **Backend:**  
  - [Node.js](https://nodejs.org)  
  - [Express.js](https://expressjs.com)  

- **Database:**  
  - [MongoDB](https://www.mongodb.com)  

- **Authentication:**  
  - [Passport.js](http://www.passportjs.org)  

---

## Installation and Setup  
Follow these steps to set up the project locally:  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. **Install dependencies:**
   ```bash
    npm install
### 3. Set up environment variables
Create a `.env` file in the project root and add the following variables:

      PORT=your-port
      MONOGO_URL=your-mongo-db-uri
      SECRET=your-session-secret
      PAY_SECRET=your-payment-secret

### 4. Start the server 
    npm start
  
## Folder Structure
    
    ├── controllers/        # Application logic\
    
    ├── models/             # Database schemas\
    
    ├── routes/             # API and application routes\
    
    ├── views/              # EJS templates\
        ├── partials/       # Reusable EJS components\
        ├── user/           # User-specific views\
    ├── public/             # Static files (CSS, JS, images)\

    └── app.js              # Main application entry point



## Usage
### Buyers
1. Sign up as a user and log in.
2. Browse available products.
3. Add items to the cart or wishlist.
4. Check out from the cart to complete a purchase.

### Sellers
1. Sign up as a seller and log in.
2. Add products with descriptions, prices, and images.
3. View and manage listed products.
