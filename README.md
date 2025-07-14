# 📈 FinAPI – Web App per la Gestione di Ordini Finanziari con Controlli Pre-Acquisto

![Java](https://img.shields.io/badge/Backend-Java%2017-blue?style=flat&logo=java)
![Spring Boot](https://img.shields.io/badge/Framework-Spring%20Boot%203.2-brightgreen?style=flat&logo=spring)
![Angular](https://img.shields.io/badge/Frontend-Angular%2017-red?style=flat&logo=angular)
![License](https://img.shields.io/github/license/sassofrancesco00/fin-api)

FinAPI è un'applicazione web full-stack progettata per simulare uno scenario reale in ambito bancario. Consente la gestione di utenti, strumenti finanziari e ordini di investimento, applicando **controlli pre-acquisto dinamici** sulla base del profilo dell’utente (Junior Trader, Senior Trader, ecc.).

---

## 🚀 Caratteristiche principali

- 🔐 **Autenticazione sicura JWT** con Spring Security
- 📋 **Gestione utenti e ruoli** con privilegi e limiti personalizzati
- 💰 **Creazione ordini finanziari** con vincoli su strumenti, rating, classi di rischio, mercati e aree geografiche
- 🧠 **Motore di validazione pre-acquisto** personalizzabile per ogni profilo utente
- 📊 **Interfaccia responsive** con Angular + Bootstrap

---

## 📂 Struttura del progetto

fin-api/
├── backend/ # Codice Java Spring Boot
│ ├── src/
│ ├── pom.xml
│ └── ...
├── frontend/ # Codice Angular
│ ├── src/
│ ├── angular.json
│ └── ...
├── test-screenshots/ # Screenshot dell'applicazione in esecuzione
├── uml-er-doc/ # Diagrammi UML, ER e documentazione progetto
└── README.md

yaml
Copia
Modifica

---

## ⚙️ Tecnologie utilizzate

| Livello     | Tecnologie principali                                             |
|-------------|-------------------------------------------------------------------|
| Frontend    | Angular 17, TypeScript, Bootstrap                                |
| Backend     | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA, JWT  |
| Database    | MySQL 8.x + Hibernate                                            |
| Dev Tools   | IntelliJ IDEA, VS Code, Postman, Swagger (OpenAPI), GitHub       |

---

## 📸 Screenshot e Demo

Puoi trovare gli screenshot funzionali dell'applicazione nella seguente cartella del repository:

🔗 [`/test-screenshots`]([https://github.com/sassofrancesco00/fin-api/tree/main/test-screenshots])

Queste immagini mostrano:
- login utente
- gestione ordini
- validazione dinamica
- interfaccia amministrativa

---

## 📑 Documentazione tecnica

La documentazione completa, inclusa la progettazione UML, lo schema ER e la descrizione delle API, si trova nella cartella:

🔗 [`/uml-er-doc`]([https://github.com/sassofrancesco00/fin-api/tree/main/uml-er-doc](https://github.com/sassofrancesco00/fin-api/blob/main/backend/docs/uml.drawio.png))

Include:
- Diagrammi dei casi d’uso
- Class diagram
- Schema ER del database
- Specifiche delle REST API generate con Swagger
- PDF dell’elaborato accademico

---

## 🧪 Avvio rapido per sviluppatori

### Requisiti
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven
- Angular CLI

### Backend
```bash
cd backend
mvn spring-boot:run
Frontend
bash
Copia
Modifica
cd frontend
npm install
ng serve
📜 Licenza
Questo progetto è distribuito sotto licenza MIT – vedi il file LICENSE per i dettagli.

✍️ Autore
Francesco Sasso – sassofrancesco00

yaml
Copia
Modifica
