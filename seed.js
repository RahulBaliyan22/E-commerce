const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Unisex Graphic T-Shirt",
    img: "https://media.istockphoto.com/id/957773456/photo/an-array-of-t-shirts-arranged-in-a-rainbow-shape-and-colours.webp?a=1&b=1&s=612x612&w=0&k=20&c=BadyF5PnLdbnjIs-AYgc2qd853RuOiTQWePQzBypInA=",
    price: 250,
    discription:"A trendy, comfortable cotton T-shirt with unique graphic designs for everyday wear.",
    quantity:10
  },
  {
    name: " Hydrating Face Serum",
    img: "https://media.istockphoto.com/id/517490444/photo/skin-care.webp?a=1&b=1&s=612x612&w=0&k=20&c=WA_iqgSctlXWIkuYg9TuQkKR8zaPtkCcvsygsNM3Acc=",
    price: 1000,
    discription:"A lightweight serum enriched with hyaluronic acid for deep skin hydration and a radiant glow.",
    quantity:10
  },
  {
    name: "Wireless Bluetooth Earbuds",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBCbHVldG9vdGglMjBFYXJidWRzfGVufDB8fDB8fHww",
    price: 1200,
    discription:"Compact earbuds with noise-cancellation and long battery life, perfect for on-the-go listening.",
    quantity:10
  },
  {
    name: "Stainless Steel Insulated Water Bottle",
    img: "https://plus.unsplash.com/premium_photo-1681284938358-bf447affcdd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U3RhaW5sZXNzJTIwU3RlZWwlMjBJbnN1bGF0ZWQlMjBXYXRlciUyMEJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 500,
    discription:"A durable, insulated water bottle that keeps drinks hot or cold for hours, ideal for work or travel.",
    quantity:10
  },
  {
    name: "High-Density Foam Roller",
    img: "https://media.istockphoto.com/id/173941355/photo/blueprint.webp?a=1&b=1&s=612x612&w=0&k=20&c=vPjhg94SKKCEY932GVrCMnSw9fETDAu5tRFLUqkKKDM=",
    price: 1599,
    discription: "A foam roller for muscle recovery, great for post-workout stretching and relieving tension.",
    quantity:10
  },

  {
    name: "Educational Wooden Block Set",
    img: "https://plus.unsplash.com/premium_photo-1702830270361-09cd9e2e58b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RWR1Y2F0aW9uYWwlMjBXb29kZW4lMjBCbG9jayUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    price: 5999,
    discription: "A colorful set of wooden blocks to help toddlers develop motor skills and learn basic shapes.",
    quantity:10
  },
  {
    name: "Organic Matcha Green Tea Powder",
    img: "https://images.unsplash.com/photo-1575487426366-079595af2247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T3JnYW5pYyUyME1hdGNoYSUyMEdyZWVuJTIwVGVhJTIwUG93ZGVyfGVufDB8fDB8fHww",
    price: 2999,
    discription: "A premium, organic matcha powder that’s perfect for lattes, smoothies, and baking.",
    quantity:10
  },

  {
    name: "2024 Leather-Bound Planner",
    img: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MjAyNCUyMExlYXRoZXIlMjBCb3VuZCUyMFBsYW5uZXJ8ZW58MHx8MHx8fDA%3D",
    price: 1500,
    discription: "A stylish, durable planner with monthly and weekly spreads to keep organized throughout the year.",
    quantity:10
  },

  {
    name: "Magnetic Car Phone Mount",
    img: "https://media.istockphoto.com/id/92619232/photo/car-navigation-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=CDNVuFjqkkpwfRMDa0vxiJ6ea5f9LTesrWdzRhAonOw=",
    price: 259,
    discription: "A hands-free phone mount that attaches securely to the car’s dashboard for easy navigation.",
    quantity:10
  },
  {
    name: "Minimalist Floating Wall Shelf",
    img: "https://media.istockphoto.com/id/518065726/photo/floating-shelf-on-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=vbFKqD5_xwKeFqI6RN9YTUPFbuZNAk4IiciMdOmAYEo=",
    price: 4599,
    discription: "A sleek, easy-to-install floating shelf for displaying decor or organizing small essentials.",
    quantity:10
  },
];

async function seedDb() {
  await Product.insertMany(products);
  console.log("Data add successfully");
}

module.exports = seedDb;
