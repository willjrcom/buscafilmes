
$("#mostrar_filme").hide();
$("#detalhes").hide();

new Vue({
	el: '#app',
	data: {
		site: 'BuscaFilmes.com',
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
					console.log(event)
					
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
				}else {
					$.alert("Nenhum titulo encontrado!");
				}
			}).fail(function(){
				$.alert("Filme não encontrado!");
			});
			
		}
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