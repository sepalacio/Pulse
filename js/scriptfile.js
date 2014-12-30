
window.onload = function(){
				console.log('Ya se disparo el evento onLoad');
			}

var $form = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#url'),
	$showBtn = $('#show-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

if (localStorage.getItem('autosave')){//si exite y tiene un valor

	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}

var id = setInterval( function(){//funcion JavaScript que se ejecuta cada x cantidad de segundos
	sessionStorage.setItem('titulo', $titulo.val());
	sessionStorage.setItem('url', $url.val());
} ,1000 );

function mostrarFormulario () {	
	$form.slideToggle();	
	tito.preventDefault();
}

function agregarPost () {
	var url = $url.val(),
		titulo = $titulo.val(),
		$clone = $post.clone();

		$clone.find( '.titulo_item a' )
			.text(titulo)
			.attr('href',url);

		$clone.hide();		
		$list.prepend($clone);
		$clone.fadeIn();

		$titulo.val('');
		$url.val('');	

		mostrarFormulario();
		tito.preventDefault(); 
}

//eventos
$showBtn.click ( mostrarFormulario );		
$form.on( 'submit', agregarPost );