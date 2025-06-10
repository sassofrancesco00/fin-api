package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.TipoPolizza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoPolizzaRepo extends JpaRepository<TipoPolizza, Long> {
    Optional<TipoPolizza> findByCodice(String codice);
}
