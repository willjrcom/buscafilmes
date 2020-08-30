var todosFilmes = [];
$("#detalhes").hide();
$("#mostrar_filtro").hide();

new Vue({
	el: '#app',
	data: {
		site: 'BuscaFilmes HD',
		busca: '',
		title: '',
		year: '',
		release: '',
		actors: '',
		awards: '',
		runtime: '',
		language: '',
		director: '',
		genre: '',
		plot: '',
		poster: '',
		country: '',
		production: '',
		writer: '',
	},
	methods: {
		alterarTitulo(){
			this.busca = event.target.value
		},
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
							filme.curtir = 0
							
							$.ajax({
								url: "/index/verificar/" + filme.title,
								type: 'PUT'
							}).done(function(e){
								if(e == null) {
									$.ajax({
										url: "/index/favoritar",
										type: "PUT",
										dataType: "json",
										contentType:'application/json',
										data: JSON.stringify(filme)
									}).done(function(e){
										$.alert({
											type: 'green',
											title: 'Parabéns',
											content: "Adicionado aos favoritos com sucesso!",
											buttons: {
												confirm:{
													text: 'Voltar',
													btnClass: 'btn-green',
													keys: ['esc', 'enter']
												}
											}
										});
									}).fail(function(e){
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
									});
								}else {
									$.alert({
										type: 'red',
										title: 'OPS...',
										content: "Filme já adicionado aos favoritos!",
										buttons: {
											confirm:{
												text: 'Voltar',
												btnClass: 'btn-red',
												keys: ['esc', 'enter']
											}
										}
									});
								}
							});
							
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
		buscar(){
			var self = this
					
			$.ajax({
				url: "http://www.omdbapi.com/?t=" + this.busca + "&apikey=c1a0dfcd&r=json"
			}).done(function(event){
				if(event.Response != 'False') {
					$("#mostrar_filme").show()
					$("#mostrar_filtro").hide();
					
					self.title = event.Title
					self.year = event.Year
					self.release = event.Released
					self.actors = event.Actors
					self.awards = event.Awards
					self.runtime = event.Runtime
					self.language = event.Language
					self.director = event.Director
					self.genre = event.Genre
					self.plot = event.Plot
					self.poster = event.Poster
					self.country = event.Country
					self.production = event.Production
					self.writer = event.Writer
					
					todosFilmes.push(event);
					console.table(todosFilmes);
					
					mostrarTodos(todosFilmes);
				}else {
					$.alert({
						type: 'red',
						title: 'OPS...',
						content: "Nenhum titulo encontrado!",
						buttons: {
							confirm:{
								text: 'Voltar',
								btnClass: 'btn-red',
								keys: ['esc', 'enter']
							}
						}
					});
					$("#mostrar_filme").hide();
				}
			}).fail(function(){
				$.alert({
					type: 'red',
					title: 'OPS...',
					content: "Nenhum titulo encontrado!",
					buttons: {
						confirm:{
							text: 'Voltar',
							btnClass: 'btn-red',
							keys: ['esc', 'enter']
						}
					}
				});
			});
			
		},
		favoritar(){
			var filme = {};
			
			filme.title = this.title
			filme.year = this.year
			filme.release = this.release
			filme.actors = this.actors
			filme.awards = this.awards
			filme.runtime = this.runtime
			filme.language = this.language
			filme.director = this.director
			filme.genre = this.genre
			filme.plot = this.plot
			filme.poster = this.poster
			filme.country = this.country
			filme.production = this.production
			filme.writer = this.writer
			filme.curtir = 0
			
			$.ajax({
				url: "/index/verificar/" + this.title,
				type: 'PUT'
			}).done(function(e){
				if(e == null) {
					
					$.ajax({
						url: "/index/favoritar",
						type: "PUT",
						dataType: "json",
						contentType:'application/json',
						data: JSON.stringify(filme)
					}).done(function(e){
						$.alert({
							type: 'green',
							title: 'Parabéns',
							content: "Adicionado aos favoritos com sucesso!",
							buttons: {
								confirm:{
									text: 'Voltar',
									btnClass: 'btn-green',
									keys: ['esc', 'enter']
								}
							}
						});
					}).fail(function(e){
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
					});
				}else {
					$.alert({
						type: 'red',
						title: 'OPS...',
						content: "Filme já adicionado aos favoritos!",
						buttons: {
							confirm:{
								text: 'Voltar',
								btnClass: 'btn-red',
								keys: ['esc', 'enter']
							}
						}
					});
				}
			});
		}
	}
});

function mostrarTodos(e) {
	var linhaHtml = '';
	
	for(var i = 0; i<e.length; i++) {
		linhaHtml +='<div class="container" align="center">'
						+'<div class="card col-sm-4">'
							+'<div class="borda">'
							  +'<img class="card-img-top" :src="poster" alt="Card image cap">'
							  
							  +'<div class="card-body">'
							  	+'<h4 class="card-title"><b>{{ title }}</b></h4>'
							   
							    +'<div class="row">'
							    	+'<div class="col-md-6">'
										+'<p class="card-text"><b>Year:</b> {{ year }}</p>'
							    	+'</div>'
							    	
							    	+'<div class="col-md-6">'
										+'<p class="card-text"><b>Runtime:</b> {{ runtime }}</p>'
							    	+'</div>'
							    +'</div>'
							    
								+'<div class="btn-group mr-2" role="group" aria-label="Second group">'
							    	+'<button type="button" class="btn btn-warning" @click="favoritar">Adicionar aos favoritos</button>'
							    	+'<button type="button" class="btn btn-primary" @click="detalhes">Detalhes</button>'
							    +'</div>'
							    
							  +'</div>'
							+'</div>'
							+'<br>'
						+'</div>'
					+'</div>';
	}
	$("#mostrar_todos").html(linhaHtml);
}
