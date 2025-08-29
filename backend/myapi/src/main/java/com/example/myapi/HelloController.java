package com.example.myapi;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*") // allow all origins (or specify http://localhost:3000)
public class HelloController {

        @GetMapping("/filter")
        public List<Item> filterItems(
                        @RequestParam(required = false) String city,
                        @RequestParam(required = false) String department,
                        @RequestParam(required = false) String name, // begins with
                        @RequestParam(required = false) Integer age,
                        @RequestParam(required = false) String ageOp, // "gt", "lt", "eq"
                        @RequestParam(required = false) Integer minAge,
                        @RequestParam(required = false) Integer maxAge) throws Exception {

                // Read JSON file from resources
                InputStream inputStream = getClass().getClassLoader().getResourceAsStream("employees.json");
                ObjectMapper objectMapper = new ObjectMapper();
                List<Item> items = objectMapper.readValue(
                                inputStream,
                                objectMapper.getTypeFactory().constructCollectionType(List.class, Item.class));

                // Filtering
                return items.stream()
                                .filter(item -> city == null || item.getCity().equalsIgnoreCase(city))
                                .filter(item -> department == null || item.getDepartment().equalsIgnoreCase(department))
                                .filter(item -> name == null
                                                || item.getName().toLowerCase().startsWith(name.toLowerCase()))
                                .filter(item -> {
                                        if (minAge != null && maxAge != null) {
                                                return item.getAge() >= minAge && item.getAge() <= maxAge;
                                        }
                                        if (age != null && ageOp != null) {
                                                return switch (ageOp.toLowerCase()) {
                                                        case "gt" -> item.getAge() > age;
                                                        case "lt" -> item.getAge() < age;
                                                        case "eq" -> item.getAge() == age;
                                                        default -> true;
                                                };
                                        }
                                        return true;
                                })
                                .collect(Collectors.toList());
        }

        @GetMapping("/hello")
        public String sayHello() {
                return "Hello, API!";
        }
}
