
$(function (){

	/*$.get('logos_footer.html', function( code ){
		$('footer').append(code);
	});*/

	$.get('usuarios.json', function(info){
		var avatar   = new Image();
		avatar.src   = info.avatar;
		avatar.title = info.nombre+" "+info.apellido;

		$('#avatar').append(avatar);

	});
});

var base_url = "http://query.yahooapis.com/v1/public/yql?"

function obtenerGeoInformacion(latitud, longitud){
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+latitud+','+longitud+'" AND gflags="R"';

	query = encodeURIComponent(query);

	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data:{
			format: 'json'
		}
	});
}

function procesarGeoInfo(datos){
	var resultado = datos.query.results.Result;
	var barrio    = resultado.neighborhood;
	var ciudad    = resultado.city;
	var pais      = resultado.country;
	var woeid     = resultado.woeid;

	$('#geo').append('<p><strong>'+barrio+'</strong><br>'+ciudad+', '+pais+'</p>');

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var queryclima = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" AND u="c"';

	queryclima = encodeURIComponent(queryclima);

	$.ajax({
		url: base_url+"q="+queryclima,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data:{
			format: 'json'
		}
	});
}

function procesarClima(datos){

	var resultadoclima = datos.queryclima.results.channel;
	var temperatura	   = resultadoclima.item.condition.temp;
	var unit	   	   = resultadoclima.units.temperature;

	$('#clima').append(temperatura+' '+unit+'°');
}