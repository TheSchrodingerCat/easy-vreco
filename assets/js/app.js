

function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	//llamamos a las ids del origen y fin del recorrido
	var inicio = document.getElementById("origen");
	var fin = document.getElementById("destino");

	var autocomplete = new google.maps.places.Autocomplete(inicio);
	autocomplete.bindTo("bounds",map)

	var autocomplete = new google.maps.places.Autocomplete(fin);
	autocomplete.bindTo("bounds",map)

	function buscar(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
		}
	}


	document.getElementById("encuentrame").addEventListener("click",buscar);

	document.getElementById("ruta").addEventListener("click",function(){
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;

		directionsDisplay.setMap(map);

		var inicio = document.getElementById("origen").value;
		var fin = document.getElementById("destino").value;

		var request = {
			origin: inicio,
			destination: fin,
			travelMode: "DRIVING"
		};

		directionsService.route(request, function(result, status){
			if (status == "OK"){
				directionsDisplay.setDirections(result);
			}
		})
	});


	var latitud, longitud;
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var icono = "http://maps.google.com/mapfiles/kml/shapes/"
		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: icono + "cycling.png"
		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function (error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}
}