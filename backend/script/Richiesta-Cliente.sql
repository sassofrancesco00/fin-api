-- Script SQL per popolare il database con i dati mockati

-- 1. Inserimento tabelle di lookup/configurazione
INSERT INTO finapi.ruolo (id, codice, descrizione) VALUES
                                              (1, 'ADMIN', 'Amministratore del sistema'),
                                              (2, 'CONSULENTE', 'Consulente finanziario'),
                                              (3, 'CLIENTE', 'Cliente finale');

INSERT INTO finapi.stato_pratica (id, codice, descrizione) VALUES
                                                      (1, 'in_revisione', 'Pratica in fase di revisione'),
                                                      (2, 'Approvata', 'Pratica approvata'),
                                                      (3, 'Respinta', 'Pratica respinta');

INSERT INTO finapi.tipo_investimento (id, codice, descrizione) VALUES
                                                          (1, 'Azioni', 'Investimenti in azioni'),
                                                          (2, 'Obbligazioni', 'Investimenti in obbligazioni'),
                                                          (3, 'ETF', 'Exchange Traded Fund');

INSERT INTO finapi.livello_rischio (id, codice, descrizione) VALUES
                                                        (1, 'Basso', 'Rischio contenuto'),
                                                        (2, 'Medio', 'Rischio moderato'),
                                                        (3, 'Alto', 'Rischio elevato');

INSERT INTO finapi.tipo_polizza (id, codice, descrizione) VALUES
                                                     (1, 'Vita', 'Polizza vita'),
                                                     (2, 'Infortuni', 'Polizza infortuni'),
                                                     (3, 'RC_Auto', 'Responsabilità civile auto'),
                                                     (4, 'Casa', 'Polizza casa');

-- 2. Inserimento utenti (dal mock data)
INSERT INTO finapi.user (id, firstname, lastname, email, ruolo_id, password, role) VALUES
                                                                                (1, 'Admin', 'Sistema', 'admin@sistema.it', 1, '$2a$10$example.hash.here', 'ADMIN'),
                                                                                (2, 'Consulente', 'Principale', 'consulente@finapi.it', 2, '$2a$10$example.hash.here', 'USER');

-- 3. Inserimento clienti (dal mock data Angular)
INSERT INTO finapi.cliente (id, firstname, lastname, codice_fiscale, telefono, email) VALUES
                                                                             (1, 'Mario', 'Rossi', 'RSSMRA80A01H501X', '3331234567', 'mario.rossi@email.it'),
                                                                             (2, 'Giuseppe', 'Verdi', 'VRDGPP75B15F205Y', '3339876543', 'giuseppe.verdi@email.it'),
                                                                             (3, 'Maria', 'Bianchi', 'BNCMRA85C20D612Z', '3335554444', 'maria.bianchi@email.it'),
                                                                             (4, 'Franco', 'Neri', 'NRIFNC70D10A662W', '3337778888', 'franco.neri@email.it'),
                                                                             (5, 'Laura', 'Gialli', 'GLLLRA88E25B345V', '3332223333', 'laura.gialli@email.it'),
                                                                             (6, 'Alessandro', 'Blu', 'BLUALS90F12C123A', '3334445555', 'alessandro.blu@email.it'),
                                                                             (7, 'Giulia', 'Rosa', 'RSOGLI92H25D456B', '3336667777', 'giulia.rosa@email.it'),
                                                                             (8, 'Davide', 'Viola', 'VLADV088L30E789C', '3338889999', 'davide.viola@email.it');

-- 4. Inserimento investimenti disponibili
INSERT INTO finapi.investimento (id, tipo_id, nome_strumento, rischio_id, rendimento_medio_atteso) VALUES
                                                                                                (1, 3, 'MSCI World ETF', 2, 7.5),
                                                                                                (2, 1, 'Tesla Inc.', 3, 12.0),
                                                                                                (3, 2, 'BTP Italia 2030', 1, 3.2),
                                                                                                (4, 1, 'Apple Inc.', 2, 8.5),
                                                                                                (5, 3, 'S&P 500 ETF', 2, 8.0),
                                                                                                (6, 2, 'Corporate Bond EUR', 1, 4.1);

-- 5. Inserimento richieste (dal mock data Angular)
INSERT INTO finapi.richiesta (id, cliente_id, user_id, data_inserimento, stato_id, motivazione_respinta) VALUES
                                                                                                      (1, 1, 1, '2025-06-15', 1, NULL),
                                                                                                      (2, 2, 1, '2025-06-14', 2, NULL),
                                                                                                      (3, 1, 1, '2025-06-13', 3, 'Importo troppo elevato per il profilo di rischio del cliente');

-- 6. Inserimento richieste investimento (dal mock data Angular)
INSERT INTO finapi.richiesta_investimento (id, richiesta_id, investimento_id, importo_investito, durata_mesi) VALUES
                                                                                                           (1, 1, 1, 50000.00, 24),  -- ETF per Mario Rossi
                                                                                                           (2, 2, 2, 25000.00, 12),  -- Azioni per Giuseppe Verdi
                                                                                                           (3, 3, 3, 75000.00, 36);  -- Obbligazioni per Mario Rossi

-- 7. Inserimento polizze assicurative (dal mock data Angular)
INSERT INTO finapi.polizza_assicurativa (id, cliente_id, user_id, tipo_polizza_id, premio_annuo, data_inizio, durata_anni, beneficiario, stato_id, motivazione_respinta) VALUES
                                                                                                                                                                      (1, 1, 1, 3, 1200.00, '2025-01-15', 1, 'Mario Rossi', 2, NULL),
                                                                                                                                                                      (2, 2, 1, 4, 800.00, '2024-07-22', 1, 'Giuseppe Verdi', 2, NULL),
                                                                                                                                                                      (3, 3, 1, 1, 2500.00, '2024-11-10', 1, 'Maria Bianchi', 2, NULL);

-- 8. Reset delle sequenze AUTO_INCREMENT (opzionale, dipende dal DB)
-- Per MySQL:
-- ALTER TABLE cliente AUTO_INCREMENT = 9;
-- ALTER TABLE richiesta AUTO_INCREMENT = 4;
-- ALTER TABLE richiesta_investimento AUTO_INCREMENT = 4;
-- ALTER TABLE polizza_assicurativa AUTO_INCREMENT = 4;
-- ALTER TABLE user AUTO_INCREMENT = 3;
-- ALTER TABLE investimento AUTO_INCREMENT = 7;