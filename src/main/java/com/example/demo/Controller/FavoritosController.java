package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.Model.Favorito;
import com.example.demo.Repository.Favoritos;

@Controller
@RequestMapping("/favoritos")
public class FavoritosController {
	
	@Autowired
	private Favoritos favoritos;
	
	@RequestMapping
	public ModelAndView index() {
		return new ModelAndView("favoritos");
	}
	
	@RequestMapping(value = "/mostrarTodos", method = RequestMethod.PUT)
	@ResponseBody
	public List<Favorito> mostrarTodos() {
		return favoritos.findAll();
	}
	
	@RequestMapping(value = "/detalhes/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public Favorito detalhes(@ModelAttribute("id") Favorito favorito) {
		return favorito;
	}
	
	@RequestMapping(value = "/curtir/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public Favorito curtir(@ModelAttribute("id") Favorito favorito) {
		favorito.setCurtir(favorito.getCurtir() + 1);
		return favoritos.save(favorito);
	}
	
	@RequestMapping(value = "/remover/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public String remover(@ModelAttribute("id") Favorito favorito) {
		favoritos.delete(favorito);
		return "ok";
	}
}
