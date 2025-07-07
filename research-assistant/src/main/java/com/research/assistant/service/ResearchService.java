package com.research.assistant.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.assistant.model.GeminiResponse;
import com.research.assistant.model.ResearchRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.List;
@Service
public class ResearchService {

    // This service will handle the business logic for processing research data
    @Value("${gemini.api.uri}")
    private String geminiApuUri;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public ResearchService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }
    public String processData(ResearchRequest request) {
        String prompt = buildPrompt(request);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );
        String response = webClient.post()
                .uri(geminiApuUri+geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extractTextFromResponse(response);
    }
    private String extractTextFromResponse(String response) {
        // This method should extract the relevant text from the Gemini API response
        // For simplicity, we will return the response as is
        try{
            GeminiResponse geminiResponse = objectMapper.readValue(response, GeminiResponse.class);
            if(geminiResponse.getCandidates() != null && !geminiResponse.getCandidates().isEmpty()){
                GeminiResponse.Candidate firstCandidate = geminiResponse.getCandidates().get(0);
                if (firstCandidate.getContent()!=null && firstCandidate.getContent().getParts() != null && !firstCandidate.getContent().getParts().isEmpty()){
                    return firstCandidate.getContent().getParts().get(0).getText();
                }
            }

        }catch (Exception e){
            e.printStackTrace();
            return "Error processing response";
        }
        return response;
    }



    private String buildPrompt(ResearchRequest request) {
      StringBuilder prompt = new StringBuilder();
      switch (request.getOperation()) {
          case "summarize":
              prompt.append("Summarize the following content: ").append(request.getContent());
              break;
          case "analyze":
              prompt.append("Analyze the following content: ").append(request.getContent());
              break;
          case "compare":
              prompt.append("Compare the following content: ").append(request.getContent());
              break;
          default:
              prompt.append("Process the following content: ").append(request.getContent());
      }
      return prompt.toString();
    }
}
