let first = ["smart", "fat", "big", "small", "dumb", "cute"];
let images = ["https://i.ibb.co/hYQgthM/user1.png","https://i.ibb.co/Ld27HW3/user2.png","https://i.ibb.co/S0mSjVy/user3.png",
  "https://i.ibb.co/34kVZVB/user4.png","https://i.ibb.co/3BrN6C5/user5.png","https://i.ibb.co/BGC1b2Y/user6.png"];

function getImage(name) {
  return images[first.indexOf(name.split("-")[0])];
  // return "https://ibb.co/dGW2C5s";
}

export default getImage;
