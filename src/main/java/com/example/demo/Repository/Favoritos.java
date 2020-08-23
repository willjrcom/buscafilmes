package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Favorito;

public interface Favoritos extends JpaRepository<Favorito,Long>{

	Optional<Favorito> findByTitle(String title);

}
