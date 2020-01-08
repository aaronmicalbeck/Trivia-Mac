import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }
// export { subscribeToTimer };


function speedometer() {
  //starting speed at 0
  let speed = 0;
  //Simulating reading data every 100 milliseconds
  setInterval(function () {
    //some sudo-randomness to change the values but not to drastically
    let nextMin = (speed - 2) > 0 ? speed - 2 : 2;
    let nextMax = speed + 5 < 140 ? speed + 5 : Math.random() * (130 - 5 + 1) + 5;
    speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);
    //we emit the data. No need to JSON serialization!
    socket.emit('incoming data', speed);
  }, 100);
}
export { speedometer };