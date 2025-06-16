import { DATABIT } from '../../config/constant';
import axios from 'axios';
import { Decode64 } from '../../utils/crypto';

export const getAddress = async (street, number, neighborhood, city, state, zipcode) => {
  const param = street + '&' + number + '&' + neighborhood + '&' + city + '&' + state + '&' + zipcode;
  let tmpurl =
    'https://maps.googleapis.com/maps/api/geocode/json?address=' + param + '&CA&key=' + Decode64(localStorage.getItem('apikey_maps'));
  try {
    const api = axios.create({});
    return await api.get(tmpurl);
  } catch (error) {
    //console.log(error);
  }
};

export const getZipCode = async (zipcode) => {
  let tmpurl =
    'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&CA&key=' + Decode64(localStorage.getItem('apikey_maps'));
  try {
    const api = axios.create({});
    return await api.get(tmpurl);
  } catch (error) {
    //console.log(error);
  }
};
