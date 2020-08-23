package Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Model.Favorito;

public interface Favoritos extends JpaRepository<Favorito,Long>{

}
