const request = require('request-promise-native');

const fetchMyIP = function() {
    return request('https://api.ipify.org?format=json');
}; // => {"ip":"70.79.171.222"}

const fetchCoordsByIP = function(body) {
    const ip = JSON.parse(body).ip;
    return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
    const { latitude, longitude } = JSON.parse(body).data;
    return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
  };


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
