import { createSelector } from 'reselect';
import Permissions from 'react-native-permissions';

export const extendDocWithMeta = (settings, doc) => {

  const {appId, user, base, event} = settings;

  const ts = doc.ts ? doc.ts : Math.round((new Date).getTime()/1000);
  const _id = doc._id ? doc._id : `${appId}:${doc.className}:${event._id.split(":").pop()}:${base._id.split(":").pop()}:${ts}`;

  const meta = {
    _id: _id,
    ts: ts,
    appId: appId,
    eventId: event._id,
    eventName: event.name,
    baseId: base._id,
    baseName: base.name,
    userName: user.name,
    userId: user._id,
    uploaded: false,
  };

  return {...doc, ...meta}
};

export const getGeolocation = (options) => new Promise( (resolve, reject) => {
  Permissions.requestPermission('location')
    .then(response => {
      if(response == 'authorized') {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      } else {
        reject('Permission: ' + response)
      }
    });
});


export const byTimestamp = (a, b) => {
  return b.ts - a.ts;
};

export const byName = (a, b) => {
  if(a.name > b.name){
    return 1;
  }
  if(a.name < b.name){
    return -1;
  }
  return 0;
};

export const binarySearch = (arr, docId) => {
  let low = 0, high = arr.length, mid;
  while (low < high) {
    mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
    arr[mid]._id < docId ? low = mid + 1 : high = mid
  }
  return low;
};

export const selectorByClassName = (className) => createSelector(
  state => state.settings.event,
  state => state.settings.base,
  state => state.docs[className] ? state.docs[className] : [],
  (event, base, docs) => event && base ? docs.filter(d => event._id == d.eventId && base._id == d.baseId).sort(byTimestamp): []
);

export const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    let seconds = Math.round(elapsed/1000)
    if(seconds === 1)
      return 'vor einer Sekunde'
    else
      return 'vor ' + seconds + ' Sekunden'
  }
  else if (elapsed < msPerHour) {
    let minutes = Math.round(elapsed/msPerMinute)
    if(minutes === 1)
      return 'vor einer Minute'
    else
      return 'vor ' + minutes + ' Minuten'
  }
  else if (elapsed < msPerDay ) {
    let hours = Math.round(elapsed/msPerHour)
    if (hours === 1) {
      return 'vor einer Stunde'
    } else
      return 'vor ' + hours + ' Stunden';
  }
  else  {
    let days = Math.round(elapsed/msPerDay)
    if(days === 1)
      return 'vor einem Tag'
    else
      return ' vor ' + days + ' Tagen';
  }
}

const padToTwo = (numberString) => {
  if (numberString.length < 2) {
    numberString = '0' + numberString;
  }
  return numberString;
}
const rgb2Hex = (rgbString) => {
  var result = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)$/.exec(rgbString)

  return result.slice(1,4)
    .map((rgbValue) => rgbValue.toInt().toString(16))
    .reduce((previous, current) => previous + padToTwo(current), '#')
}

export const hexAverage = (...args) => {
  return args.reduce(function (previousValue, currentValue) {
    if(currentValue.indexOf('rgb') === 0) {
      currentValue = rgb2Hex(currentValue)
    }
    return currentValue
      .replace(/^#/, '')
      .match(/.{2}/g)
      .map(function (value, index) {
        return previousValue[index] + parseInt(value, 16);
      });
  }, [0, 0, 0])
    .reduce(function (previousValue, currentValue) {
      return previousValue + padToTwo(Math.floor(currentValue / args.length).toString(16));
    }, '#');
}

export const unreadChatMessages = (state) => {
  let lastChatMessage = state.docs.ChatMessage && state.settings.event && state.docs.ChatMessage.filter(elem => elem.eventId === state.settings.event._id).sort((a,b) => a.ts - b.ts).pop()
  try {
    // Home -> DrawerClose
    let drawerCloseNav = state.nav.routes[state.nav.index].routes.find(route => route.routeName === 'DrawerClose')
    // current nav -> routeName
    var inChatView = drawerCloseNav.routes[drawerCloseNav.index].routeName === 'Chat'
  } catch (e) {
    var inChatView = false
  }
   return !inChatView && lastChatMessage && state.chat.lastSeenMessages && Date.parse(lastChatMessage.data.createdAt) > state.chat.lastSeenMessages
}
