package com.example.demo.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.Model.Favorito;
import com.example.demo.Repository.Favoritos;

@Controller
@RequestMapping("/index")
public class HomeController {
	
	@Autowired
	private Favoritos favoritos;
	
	@RequestMapping
	public ModelAndView index() {
		return new ModelAndView("index");
	}
	
	@RequestMapping(value = "/favoritar", method = RequestMethod.PUT)
	@ResponseBody
	public Favorito favoritar(@RequestBody Favorito filme) {
		return favoritos.save(filme);
	}
	
	@RequestMapping(value = "/verificar/{title}", method = RequestMethod.PUT)
	@ResponseBody
	public Optional<Favorito> verificar(@PathVariable String title){
		return favoritos.findByTitle(title);
	}
}
