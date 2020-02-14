const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error,null); 
        }
        fetchCoordsByIp(ip, (error, coords) => {
            if (error) {
                return callback(error,null);
            }
            fetchISSFlyOverTimes(coords, (error, passes) => {
                if (error) {
                    return callback(error, null)
                }
                callback(null, passes);
            });    
        }); 
    });
};

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json',(error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, data.ip);
  });
};
// https://ipvigilante.com/162.245.144.188

const fetchCoordsByIp = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

  
module.exports = { nextISSTimesForMyLocation };
  