let center = [55.026345949276894,73.2909843181521]

ymaps.ready(function () {

  let myMap = new ymaps.Map('map-test', {
    center: center,
    zoom: 15,
    controls: ['routePanelControl']
  });

  let control = myMap.controls.get('routePanelControl');
  let city = 'Омск';

  let location = ymaps.geolocation.get();

   location.then(function(res) {
   	let locationText = res.geoObjects.get(0).properties.get('text');
   	console.log(locationText)
   });

   let placemark = new ymaps.Placemark(center, {}, {
		iconLayout: 'default#image',
		iconImageHref: 'https://www.flaticon.com/free-icon/fox_616519?term=fox&page=1&position=1&origin=search&related_id=616519',
		iconImageSize: [40, 40],
		iconImageOffset: [20, 20]
	});

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;

    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);


    let reverseGeocoder = ymaps.geocode([crd.latitude, crd.longitude]);
    let locationText = null;
    reverseGeocoder.then(function (res) {
      locationText = res.geoObjects.get(0).properties.get('text')
      console.log(locationText)

      control.routePanel.state.set({
        type: 'masstransit',
        fromEnabled: false,
        from: locationText,
        toEnabled: true,
        to: `${city}, проспект Мира, 11`,
      });
    });

    console.log(locationText)

    

    control.routePanel.options.set({
      types: {
        masstransit: true,
        pedestrian: true,
        taxi: true
      }
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);



});
