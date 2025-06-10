package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.Ruolo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RuoloRepo extends JpaRepository<Ruolo, Long> {
    Optional<Ruolo> findByCodice(String codice);
}
