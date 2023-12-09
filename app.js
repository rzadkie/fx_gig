'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const lightsIds = [];



const Lifx = require('lifx-lan-client').Client;
const client = new Lifx();

client.on('error', function(err) {
  console.log('LIFX error:\n' + err.stack);
  client.destroy();
});

client.on('message', function(msg, rinfo) {
  if (typeof msg.type === 'string') {
    // Known packages send by the lights as broadcast
    switch (msg.type) {
      case 'echoResponse':
      case 'getOwner':
      case 'stateOwner':
      case 'getGroup':
      case 'getVersion':
      case 'stateGroup':
      case 'getLocation':
      case 'stateLocation':
      case 'stateTemperature':
        console.log(msg, ' from ' + rinfo.address);
        break;
      default:
        break;
    }
  } else {
    // Unknown message type
    console.log(msg, ' from ' + rinfo.address);
  }
});

client.on('light-new', function(light) {
  console.log('New light found. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
  if (!lightsIds.includes(light.id)){
    lightsIds.push(light.id);
  }
});

client.on('light-online', function(light) {
  console.log('Light back online. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
});

client.on('light-offline', function(light) {
  console.log('Light offline. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
});

client.on('listening', function() {
  const address = client.address(); 

  console.log(
    'Started LIFX listening on ' +
    address.address + ':' + address.port + '\n'
  );
});



let easymidi = require('easymidi');
let input = new easymidi.Input('loopMIDI Port');

input.on('noteon', function (msg) {
  let xqr = client.light(lightsIds[0]);
  let xqx = client.light(lightsIds[1]);
  console.log(msg);
  switch (msg.note){
    case 1:
      xqr.off(0);
      break;
    case 2:
      xqx.off(0);
      break;

    case 3:
      xqr.off(msg.velocity * 100);
      break;
    case 4:
      xqx.off(msg.velocity * 100);
      break;

    case 5:
      xqr.off(msg.velocity);
      break;
    case 6:
      xqx.off(msg.velocity);
      break;

    case 7:
      xqr.on(0);
      break;
    case 8:
      xqx.on(0);
      break;
    case 9:
      xqr.on(msg.velocity);
      break;
    case 10:
      xqx.on(msg.velocity);
      break;
    case 11:
      // setter invokes callback with ticks, which will define its length

      break;

    case 50:
      xqx.colorRgb(255, 0, 0, 70);
      break;
    case 51:
      xqx.colorRgb(0, 255, 0, 70);
      break;
    case 52:
      xqx.colorRgb(0, 0, 255, 70);
      break;



    case 60:
      xqr.color(255, 0, 0, 70);
      break;
    case 61:
      xqr.colorRgb(0, 255, 0, 70);
      break;
    case 62:
      xqr.colorRgb(0, 0, 255, 70);
      break;
    case 63:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 64:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(200, 30, 100, 70);
      break;
    case 65:
      xqr.color(20, 30, 100, 70);
      break;
    case 66:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 67:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 68:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 69:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(200, 30, 100, 70);
      break;
    case 70:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 71:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(20, 200, 100, 70);
      break;
    case 72:
      xqx.colorRgb(20, 30, 100, 70);
      xqr.colorRgb(200, 30, 100, 70);
      break;


    case 80:
      //xqx.waveform(100, 100, 50, 3500, false, 500, 10e30 , 0.6, 4);
      //xqr.waveform(200, 100, 50, 3500, false, 500, 10e30 ,0.6, 1);
      //xqx.waveform(50, 50, 80, 3500, true, 200, 5);
      xqx.waveform(360, 0, msg.velocity, 6000, true, 25, 1, 0.5, 0);
      break;

    case 90:
        xqx.on(0)
        xqx.color(0, 100, 50, 2500, 0);
        xqr.on(0)
        xqr.color(0, 100, 50, 2500, 0);
        break;

  }
});

const leCount = async () => {

}

input.on('clock', () =>{
  console.log('tick');
})

client.init();

module.exports = app;
