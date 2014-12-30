
$( function(){

	var geo = navigator.geolocation;
	var opciones = {};

	function geo_error() {
		console.log('No se donde te estas');
	}

	function geo_exito(posicion) {
		var latitud  = posicion.coords.latitude;
		var longitud = posicion.coords.longitude;		
		var mapa     = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x300&sensor=false&center="+latitud+","+longitud;
		$('#geo').prepend(mapa);

		obtenerGeoInformacion(latitud, longitud);

	}

	geo.getCurrentPosition(geo_exito, geo_error, opciones);
			
});