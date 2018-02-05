import axios from 'axios';
import * as CommonHelper from './helper';
import * as Constant from './const';

module.exports = {

  //request for accessing current venues places
  _getVenues(lat, long) {
    return axios.get(Constant.BASEURL+"search?v=20170101&limit=20&ll="+lat+","+long+"&client_id="+Constant.CLIENTID+"&client_secret="+Constant.CLIENTSECRETID+'&categoryId=4d4b7104d754a06370d81259,4d4b7105d754a06374d81259,4d4b7105d754a06376d81259,4d4b7105d754a06377d81259');
  },
  //request for list of places
  _getPlaces(venueId) {
    return axios.get(Constant.BASEURL+venueId+"/photos?v=20170101&limit=1&client_id="+Constant.CLIENTID+"&client_secret="+Constant.CLIENTSECRETID);
  },
  //request for accessing venue details
   _getVenueDetails(venueId) {
    return axios.get(Constant.BASEURL+venueId+"?v=20170101&client_id="+Constant.CLIENTID+"&client_secret="+Constant.CLIENTSECRETID);
  }
}
