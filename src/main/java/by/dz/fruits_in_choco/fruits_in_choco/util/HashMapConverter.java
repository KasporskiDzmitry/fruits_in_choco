package by.dz.fruits_in_choco.fruits_in_choco.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.Map;
@Service
public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {
    private final ObjectMapper objectMapper;

    public HashMapConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convertToDatabaseColumn(Map<String, Object> attributes) {
        String attributesJson = null;
        try {
            attributesJson = objectMapper.writeValueAsString(attributes);
        } catch (final JsonProcessingException e) {
            System.out.println("JSON writing error");
        }

        return attributesJson;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String attributesJson) {
        Map<String, Object> attributes = null;
        try {
            attributes = objectMapper.readValue(attributesJson, Map.class);
        } catch (final IOException e) {
            System.out.println("JSON reading error");
        }

        return attributes;
    }
}
