const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
//   console.log(typeof ip) => string
});


// fetchCoordsByIp("162.245.144.188", (error,data) => {
//     if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       console.log('It worked! Returned Coordinates:' , data);
// });

