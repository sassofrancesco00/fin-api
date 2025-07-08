package com.tesi.francescosasso.finapi.fin_api.domain.dto;

import com.tesi.francescosasso.finapi.fin_api.domain.RichiestaInvestimento;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author Francesco Sasso
 * @version 1.0
 * @since 2025
 */
@Data
public class RichiestaInvestimentoDTO {
    private Long id;
    private RichiestaDTO richiesta;
    private InvestimentoDTO investimento;
    private Double importoInvestito;
    private Integer durataMesi;

    // Nested DTOs
    @Data
    public static class RichiestaDTO {
        private Long id;
        private ClienteDTO cliente;
        private UserDTO user;
        private LocalDate dataInserimento;
        private StatoPraticaDTO stato;
        private String motivazioneRespinta;
    }

    @Data
    public static class ClienteDTO {
        private Long id;
        private String nome;
        private String cognome;
        private String email;
        private String telefono;
        private String codiceFiscale;
    }

    @Data
    public static class UserDTO {
        private Integer id;
        private String username;
        private String email;
    }

    @Data
    public static class StatoPraticaDTO {
        private Long id;
        private String nome;
        private String descrizione;
    }

    @Data
    public static class InvestimentoDTO {
        private Long id;
        private TipoInvestimentoDTO tipo;
        private String nomeStrumento;
        private LivelloRischioDTO rischio;
        private Double rendimentoMedioAtteso;
    }

    @Data
    public static class TipoInvestimentoDTO {
        private Long id;
        private String nome;
        private String descrizione;
    }

    @Data
    public static class LivelloRischioDTO {
        private Long id;
        private String nome;
        private String descrizione;
        private Long livello;
    }

    // Metodo di conversione da Entity a DTO
    public static RichiestaInvestimentoDTO fromEntity(RichiestaInvestimento entity) {
        RichiestaInvestimentoDTO dto = new RichiestaInvestimentoDTO();
        dto.setId(entity.getId());
        dto.setImportoInvestito(entity.getImportoInvestito());
        dto.setDurataMesi(entity.getDurataMesi());

        // Conversione Richiesta
        if (entity.getRichiesta() != null) {
            RichiestaDTO richiestaDTO = new RichiestaDTO();
            richiestaDTO.setId(entity.getRichiesta().getId());
            richiestaDTO.setDataInserimento(entity.getRichiesta().getDataInserimento());
            richiestaDTO.setMotivazioneRespinta(entity.getRichiesta().getMotivazioneRespinta());

            // Cliente
            if (entity.getRichiesta().getCliente() != null) {
                ClienteDTO clienteDTO = new ClienteDTO();
                clienteDTO.setId(entity.getRichiesta().getCliente().getId());
                clienteDTO.setNome(entity.getRichiesta().getCliente().getFirstname());
                clienteDTO.setCognome(entity.getRichiesta().getCliente().getLastname());
                clienteDTO.setEmail(entity.getRichiesta().getCliente().getEmail());
                clienteDTO.setTelefono(entity.getRichiesta().getCliente().getTelefono());
                clienteDTO.setCodiceFiscale(entity.getRichiesta().getCliente().getCodiceFiscale());
                richiestaDTO.setCliente(clienteDTO);
            }

            // User
            if (entity.getRichiesta().getUser() != null) {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(entity.getRichiesta().getUser().getId());
                userDTO.setUsername(entity.getRichiesta().getUser().getUsername());
                userDTO.setEmail(entity.getRichiesta().getUser().getEmail());
                richiestaDTO.setUser(userDTO);
            }

            // Stato
            if (entity.getRichiesta().getStato() != null) {
                StatoPraticaDTO statoDTO = new StatoPraticaDTO();
                statoDTO.setId(entity.getRichiesta().getStato().getId());
                statoDTO.setNome(entity.getRichiesta().getStato().getCodice());
                statoDTO.setDescrizione(entity.getRichiesta().getStato().getDescrizione());
                richiestaDTO.setStato(statoDTO);
            }

            dto.setRichiesta(richiestaDTO);
        }

        // Conversione Investimento
        if (entity.getInvestimento() != null) {
            InvestimentoDTO investimentoDTO = new InvestimentoDTO();
            investimentoDTO.setId(entity.getInvestimento().getId());
            investimentoDTO.setNomeStrumento(entity.getInvestimento().getNomeStrumento());
            investimentoDTO.setRendimentoMedioAtteso(entity.getInvestimento().getRendimentoMedioAtteso());

            // Tipo Investimento
            if (entity.getInvestimento().getTipo() != null) {
                TipoInvestimentoDTO tipoDTO = new TipoInvestimentoDTO();
                tipoDTO.setId(entity.getInvestimento().getTipo().getId());
                tipoDTO.setNome(entity.getInvestimento().getTipo().getCodice());
                tipoDTO.setDescrizione(entity.getInvestimento().getTipo().getDescrizione());
                investimentoDTO.setTipo(tipoDTO);
            }

            // Livello Rischio
            if (entity.getInvestimento().getRischio() != null) {
                LivelloRischioDTO rischioDTO = new LivelloRischioDTO();
                rischioDTO.setId(entity.getInvestimento().getRischio().getId());
                rischioDTO.setNome(entity.getInvestimento().getRischio().getCodice());
                rischioDTO.setDescrizione(entity.getInvestimento().getRischio().getDescrizione());
                rischioDTO.setLivello(entity.getInvestimento().getRischio().getId());
                investimentoDTO.setRischio(rischioDTO);
            }

            dto.setInvestimento(investimentoDTO);
        }

        return dto;
    }
}