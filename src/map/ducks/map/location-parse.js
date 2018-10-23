export default (location) => ({
  lat: parseFloat(location.split(',')[0]),
  lng: parseFloat(location.split(',')[1])
});
