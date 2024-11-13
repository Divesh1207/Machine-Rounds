//Variables

const accountId = 144553;
let accountEmail = "hitesh@google.com";
var accountPassword = "12345";
accountCity = "Jaipur";
let accountState;

// accountId = 2 // const m wapis s hum assign nhi kr skte hain ,consttant rehta hai const lga de to

accountEmail = "hc@hc.com";
accountPassword = "21212121";
accountCity = "Bengaluru";

console.log(accountId);

/*
Prefer not to use var
because of issue in block scope and functional scope=>var password=1234
ye if{} k block scope m use kr rhe hai ,for loop{} etc k block m use kr rhe hain to agr ek jgh bhi humlog var ko change krnge to sb jgh change ho jaata hai 
*/

console.table([
  accountId,
  accountEmail,
  accountPassword,
  accountCity,
  accountState,
]);

// 1. Defining object =>

//An object is a collection of key-value pairs,
//where each key (or "property") is a string (or symbol) and each value can be any data type,
//including numbers, strings, functions, arrays, or even other objects.
//objects k  protoype m check kro jo responses mil rha hai..usme
//do ye  map ,fo each loop nahi hota hai
const Object = {
  //object bnane ka fayda ye hota hai ki humlog khud ksa keys bna skte hain
  // access keys k basis p kr skte hain
  //arrays m pr index based p krte hau 0,1,2 etc.

  //Keys:  "pairs"
  name: "divesh",
  age: "22",
};

//2.Destructuring the object

const { age } = Object;
console.log(age);
//Passing the object in function
const user = {
  username: "hitesh",
  price: 199,
};

function handleObject(anyobject) {
  console.log(
    `Username is ${anyobject.username} and price is ${anyobject.price}`
  );
}
handleObject(user);

// 3.array=>
//An array is a data structure
//that stores multiple pieces of data of the same type or mixed data types.
//Arrays ko pechanne k liye protoype m check kro jo responses mil rha hai..usme
//do chij definetlyhota h map ,fo each loop

const myArr = [0, 1, 2, 3, 4, 5];

const myHeors = ["shaktiman", "naagraj"];

const myArr2 = new Array(1, 2, 3, 4);

// Array methods

// myArr.push(6)
// myArr.push(7)
// myArr.pop()

// myArr.unshift(9)
// myArr.shift()

// console.log(myArr.includes(9));
// console.log(myArr.indexOf(3));

// const newArr = myArr.join()

// console.log(myArr);
// console.log( newArr);

// 4.how to work with json ,extracting data in arrays,extracting data in objects
fetch("https://api.github.com/users/hiteshchoudhary")
  .then((response) => response.json()) //response string m milta hai isliye json m convert kro
  .then((data) => {
    // `data.users` ko access kar rahe hain jo ek array hai
    const users = data.data.users;

    // users array par loop lagate hain, kyunki `users` ek array hai
    users.forEach((user) => {
      // Yahan par `user` ek object hai, toh hum dot notation se properties ko access karte hain
      console.log("User ID:", user.id); // `user` object ka `id` property
      console.log("Name:", user.name); // `user` object ka `name` property

      // Nested object `details` ko access kar rahe hain
      console.log("Age:", user.details.age); // `user.details` object ka `age` property
      console.log("City:", user.details.city); // `user.details` object ka `city` property

      // Hobbies ek array hai, toh hum us par bhi loop lagate hain
      user.hobbies.forEach((hobby) => {
        console.log("Hobby:", hobby); // `hobbies` array ke har element ko access karte hain
      });
    });
  })
  .catch((error) => console.error("Error:", error));

//How to write the promises

const promiseOne = new Promise(function (resolve, reject) {
  //Do an async task
  // DB calls, cryptography, network
  setTimeout(function () {
    resolve(); //console log tk phuchne k baad ye resolve() invoke hoga aur btayega
    // .then ko ki ab tum chl skte ho
  }, 5000); //ye last m execute hoga (yhi closure picture m
  //aata hai jb tk ye resolve nhi hua tb tk
  //aur jitne bhi functions hai wo chlte rhnge execute honge iska refrence rhega jaise ye fullfill hoga to execute hoga ...closure k wjh s
  // hi javascript async bheve krta hai )
});

promiseOne.then(function () {
  //resolve() k invoke hone k baad hi yha aayega nahi to nahi aayegaa
  console.log("Promise consumed");
});

//Another way to write the promises
new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log("Async task 2");
    resolve(); //console log tk phuchne k baad ye resolve() invoke hoga aur btayega
    // .then ko ki ab tum chl skte ho
  }, 1000);
}).then(function () {
  //resolve() k invoke hone k baad hi yha aayega nahi to nahi aayegaa
  console.log("Async 2 resolved");
});

//yaha data kaise pass krte hain resolve k through wo hai
const promiseThree = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ username: "Chai", email: "chai@example.com" }); //Data pass ho rha h
  }, 1000);
});

promiseThree.then(function (user) {
  //user as a copy hai jo data consume kr rha hai
  console.log(user);
});

//Resolve aur reject kaise kaam kr rha hai
const promiseFour = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = true;
    if (!error) {
      resolve({ username: "hitesh", password: "123" });
    } else {
      reject("ERROR: Something went wrong");
    }
  }, 1000);
});

promiseFour
  .then((user) => {
    console.log(user);
    return user.username;
  })
  .then((username) => {
    console.log(username);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => console.log("The promise is either resolved or rejected"));

//Anothr way of Handling promise by using async await

async function getAllUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //yha bhi lgega await

    const data = await response.json(); //await yha bhi lgega kyuki response milne m waqt lgta hai
    console.log(data);
  } catch (error) {
    console.log("E: ", error);
  }
}

getAllUsers();

//Now using .then=>Guess what this is easy
const dummydata = fetch("https://api.github.com/users/hiteshchoudhary")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));
