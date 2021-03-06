var todosFilmes;
var filtros;
$("#mostrar_filme").show();


new Vue({
	el: '#app',
	data: {
		site: 'Meus Favoritos',
	}
});


//--------------------------------------------------------------------------------------------------------
function buscar() {
	//funcao buscar filmes
	$.ajax({
		url: "/favoritos/mostrarTodos",
		type: 'PUT'
	}).done(function(e){
		todosFilmes = e;
		todosFilmes.sort(function (a, b) {
			return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
		});
		mostrarTodos(todosFilmes);
	});
}
buscar();

//--------------------------------------------------------------------------------------------------------
function filtro(e) {
	filtros = e.value;
	if(e.value == "CRESCENTE") {
		todosFilmes.sort(function (a, b) {
			return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
		});
	}else if(e.value == "DECRESCENTE"){
		todosFilmes.sort(function (a, b) {
			return (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0);
		});
	}else if(e.value == "CURTIDAS"){
		todosFilmes.sort(function (a, b) {
			return (a.curtir < b.curtir) ? 1 : ((b.curtir < a.curtir) ? -1 : 0);
		});
	}else if(e.value == "DESCURTIDAS"){
		todosFilmes.sort(function (a, b) {
			return (a.curtir > b.curtir) ? 1 : ((b.curtir > a.curtir) ? -1 : 0);
		});
	}
	mostrarTodos(todosFilmes);
};


//----------------------------------------------------------------------------------------------------------------
function mostrarTodos(e) {
	var linhaHtml = '<div class="row">';
	for(var i = 0; i<e.length; i++) {
		linhaHtml += '<div class="card">'
						+'<div class="borda">'
						+'<div class="row">'
						  +'<div class="container col-md-2">'
						  +'<img class="card-img-top" src="' + e[i].poster + '" alt="Card image cap"></div>'
						  +'<div class="card-body col-md-10">'
						    +'<h5 class="card-title"><b>Title: </b>' + e[i].title + '</h5>'
						    +'<div class="row">'
						    	+'<div class="col-md-6">'
									+'<p class="card-text"><b>Year: </b>' + e[i].year + '</p>'
						    	+'</div>'
						    	
						    	+'<div class="col-md-6">'
									+'<p class="card-text"><b>Runtime: </b>' + e[i].runtime + '</p>'
						    	+'</div>'
						    +'</div>'
						    
						    +'<p class="card-text"><b>Plot: </b>' + e[i].plot + '</p>'
							+'<div class="btn-group mr-2" role="group" aria-label="Second group">'
							    +'<button type="button" onclick="curtir()" class="btn btn-primary" value="' + e[i].id + '"><span class="oi oi-thumb-up"></span></button>'
							    +'<button type="button" class="btn">' + e[i].curtir + '</button>'
							    +'<button type="button" onclick="detalhes()" class="btn btn-primary" value="' + e[i].id + '">Detalhes</button>'
							  +'</div>'	
							+'</div>'
						  +'</div>'
						  +'<br>'
						  +'</div>'
					+'</div><br>';
	}
	linhaHtml += '</div>';
	$("#mostrar_filme").html(linhaHtml);
}


//---------------------------------------------------------------------------------------
function curtir(){
	var botaoReceber = $(event.currentTarget);
	var id = botaoReceber.attr('value');
	
	$.ajax({
		url: "/favoritos/curtir/" + id,
		type: 'PUT'
	}).done(function(e){
		buscar();
	});
	
}
//---------------------------------------------------------------------------------------
function detalhes(){
	var botaoReceber = $(event.currentTarget);
	var id = botaoReceber.attr('value');
	
	$.ajax({
		url: "/favoritos/detalhes/" + id,
		type: 'PUT'
	}).done(function(e){
		$.alert({
			type: 'blue',
			title: e.title,
			content:
				"<p><b>Year:</b> " + e.year  + "</p>\r\n" + 
				"<p><b>Release:</b> " + e.release  + "</p>\r\n" + 
				"<p><b>Actors:</b> " + e.actors  + "</p>\r\n" + 
				"<p><b>Awards:</b> " + e.awards  + "</p>\r\n" + 
				"<p><b>Runtime:</b> " + e.runtime  + "</p>\r\n" + 
				"<p><b>Language:</b> " + e.language  + "</p>\r\n" + 
				"<p><b>Director:</b> " + e.director  + "</p>\r\n" + 
				"<p><b>Genre:</b> " + e.genre  + "</p>\r\n" + 
				"<p><b>Country:</b> " + e.country  + "</p>\r\n" + 
				"<p><b>Production:</b> " + e.production  + "</p>\r\n" + 
				"<p><b>Writer:</b> " + e.writer  + "</p>\r\n" + 
				"<p><b>Plot:</b> " + e.plot  + "</p>",
			buttons: {
		        confirm: {
		            text: '<span class="oi oi-star"></span> Remover dos Favoritos',
		            btnClass: 'btn-danger',
		            keys: ['enter'],
		            action: function(){
						$.ajax({
							url: "/favoritos/remover/" + id,
							type: 'PUT'
						}).done(function(){
								window.location.reload();
						}).fail(function(){
							$.alert({
								type: 'red',
								title: 'OPS...',
								content: "Tente novamente!",
								buttons: {
									confirm:{
										text: 'Voltar',
										btnClass: 'btn-red',
										keys: ['esc', 'enter']
									}
								}
							});
						})
					}
				},
		        cancel: {
		            text: 'Voltar',
		            btnClass: 'btn-green',
		            keys: ['esc']
				}
			}
		});
	}).fail(function(){
		$.alert({
			type: 'red',
			title: 'OPS...',
			content: "Detalhes não disponível!",
			buttons: {
				confirm:{
					text: 'Voltar',
					btnClass: 'btn-red',
					keys: ['esc', 'enter']
				}
			}
		});
	});
}
