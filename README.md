# 🧠 Smart Research Assistant

An AI-powered research assistant built with **Spring Boot** and **Spring AI**. This project allows users to ask research questions and receive intelligent summaries and answers powered by large language models (LLMs).

> 🚀 Inspired by EmbarkX's tutorial on building LLM-integrated backend services with Spring.

---


## 🛠️ Features

- 🔍 Ask complex research questions via a simple API.
- 🤖 Integrated with LLMs (e.g., OpenAI or HuggingFace models via Spring AI).
- ⚡ Fast and efficient response generation using reactive WebClient.
- 🧰 Modular and extensible architecture (Controller → Service → AI Client).
- 🛡️ Error handling and response formatting.
- 📦 Easy deployment-ready Spring Boot structure.

---

## 🧱 Tech Stack

| Layer            | Tech                                |
|------------------|-------------------------------------|
| Backend          | Spring Boot                         |
| AI Integration   | Spring AI                           |
| HTTP Client      | WebClient (Spring WebFlux)          |
| Language Model   | Gemini (or configurable alternative)|
| Build Tool       | Maven                               |
| Java Version     | Java 17+                            |

---

### 🔮 Future Enhancements

- 📚 **Citation & Source Linking**
  - Add reference links to credible sources like Semantic Scholar or arXiv in the AI response.

- 🗃️ **Semantic Search with Vector Store**
  - Use embeddings to perform similarity-based search over uploaded documents.

- 🧩 **Multi-Model Support**
  - Let users choose between OpenAI, local models, or HuggingFace for different use cases.
    
---

### Clone the Repository
```bash
  git clone https://github.com/your-username/smart-research-assistant.git
  cd smart-research-assistant


