package com.tesi.francescosasso.finapi.fin_api.repo;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RichiestaInvestimentoRepo extends JpaRepository<RichiestaInvestimento, Long> {
    List<RichiestaInvestimento> findByRichiestaId(Long richiestaId);

    List<RichiestaInvestimento> findByInvestimentoId(Long investimentoId);
}
