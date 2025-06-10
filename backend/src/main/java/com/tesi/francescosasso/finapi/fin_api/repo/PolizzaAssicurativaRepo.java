package com.tesi.francescosasso.finapi.fin_api.repo;


import com.tesi.francescosasso.finapi.fin_api.domain.PolizzaAssicurativa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolizzaAssicurativaRepo extends JpaRepository<PolizzaAssicurativa, Long> {
    List<PolizzaAssicurativa> findByClienteId(Long clienteId);

    List<PolizzaAssicurativa> findByUserId(Long userId);
}
