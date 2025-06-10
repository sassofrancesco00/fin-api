package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.NotaInterna;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaInternaRepo extends JpaRepository<NotaInterna, Long> {
    List<NotaInterna> findByRichiestaId(Long richiestaId);

    List<NotaInterna> findByPolizzaId(Long polizzaId);
}
