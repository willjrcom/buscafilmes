//buscar filmes
$.ajax({
	url: "/favoritos/mostrarTodos",
	type: 'PUT'
}).done(function(e){
	console.table(e)
	var linhaHtml = '<div class="row">';
	for(var i = 0; i<e.length; i++) {
		linhaHtml += '<div class="card col-md-4">'
						  +'<img class="card-img-top" src="' + e[i].poster + '" alt="Card image cap">'
						  +'<div class="card-body">'
						    +'<h5 class="card-title"><b>Title: </b>' + e[i].title + '</h5>'
						    +'<div class="row">'
						    	+'<div class="col-md-6">'
									+'<p><b>Year: </b>' + e[i].year + '</p>'
						    	+'</div>'
						    	
						    	+'<div class="col-md-6">'
									+'<p><b>Runtime: </b>' + e[i].runtime + '</p>'
						    	+'</div>'
						    +'</div>'
						    
						    +'<p class="card-text" rows="1"><b>Plot: </b>' + e[i].plot + '</p>'

							+'<a><button class="btn btn-primary" onclick="detalhes()" value="' + e[i].id + '">Detalhes</button></a><br>'
						  +'</div>'
					+'</div>';
	}
	linhaHtml += '</div>';
	$("#mostrar_filme").html(linhaHtml);
});


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
		            text: 'Remover dos Favoritos',
		            btnClass: 'btn-danger',
		            keys: ['enter'],
		            action: function(){
						$.ajax({
							url: "/favoritos/remover/" + id,
							type: 'PUT'
						}).done(function(){
								window.location.reload();
						}).fail(function(){
							$.alert("OPS... Tente novamente!");
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
		$.alert("Detalhes não disponível!");
	});
}


new Vue({
	el: '#app',
	data: {
		site: 'Meus Favoritos',
		filmes: {}
	},
	methods: {
		detalhes(){
			var self = this
					
			$.alert({
				type: 'green',
				title: this.title,
				content: 
						"<p><b>Title:</b> " + this.title  + "</p>\r\n" + 
						"<p><b>Year:</b> " + this.year  + "</p>\r\n" + 
						"<p><b>Release:</b> " + this.release  + "</p>\r\n" + 
						"<p><b>Actors:</b> " + this.actors  + "</p>\r\n" + 
						"<p><b>Awards:</b> " + this.awards  + "</p>\r\n" + 
						"<p><b>Runtime:</b> " + this.runtime  + "</p>\r\n" + 
						"<p><b>Language:</b> " + this.language  + "</p>\r\n" + 
						"<p><b>Director:</b> " + this.director  + "</p>\r\n" + 
						"<p><b>Genre:</b> " + this.genre  + "</p>\r\n" + 
						"<p><b>Country:</b> " + this.country  + "</p>\r\n" + 
						"<p><b>Production:</b> " + this.production  + "</p>\r\n" + 
						"<p><b>Writer:</b> " + this.writer  + "</p>\r\n" + 
						"<p><b>Plot:</b> " + this.plot  + "</p>",
				buttons: {
			        confirm: {
			            text: 'Adicionar aos Favoritos',
			            btnClass: 'btn-warning',
			            keys: ['enter'],
			            action: function(){
							var filme = {};
							
							filme.title = self.title
							filme.year = self.year
							filme.release = self.release
							filme.actors = self.actors
							filme.awards = self.awards
							filme.runtime = self.runtime
							filme.language = self.language
							filme.director = self.director
							filme.genre = self.genre
							filme.plot = self.plot
							filme.poster = self.poster
							filme.country = self.country
							filme.production = self.production
							filme.writer = self.writer
							
						}
					},
			        cancel: {
			            text: 'Voltar',
			            btnClass: 'btn-red',
			            keys: ['esc']
					}
				}
			});
		},
	}
});

/*

<input type="text" v-on:input="alterarTitulo"/><!-- escrever em tempo real -->
<p v-once>{{ titulo }}</p><!-- o treco não se atualiza após ser utilizado -->
<p >{{ titulo }}</p><!-- o treco não se atualiza após ser utilizado -->
<a v-bind:href="link">google</a><!-- acessar link -->
<p v-html="linkHtml"></p><!-- receber o html -->
<p>{{ saudacao() }}</p>
<p v-on:mousemove="atualizarXY">Mouse: {{ x }} e {{ y }}</p>
<p>{{ contador % 2 == 0 ? contador * 2 : contador}}</p>
<button v-on:click="somar">Somar</button>

new Vue({
el: '#app',
data:{
	titulo: 'ola',
	link: 'https://www.google.com.br',
	linkHtml: '<a href="https://www.google.com.br">Link</a>',
	contador: 0,
	x: 0,
	y: 0
},
methods: {
	  alterarTitulo(event){
		  this.titulo = event.target.value
	  }
	saudacao: function(){
		return 'Bom dia!'
	},
	 alterarTitulo(event){
		  this.titulo = event.target.value
	},
	atualizarXY(event){
		this.x = event.clientX
		this.y = event.clientY
	},
	somar(){
		this.contador++
	},
}
})*/