package com.example.myapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HelloController {

    // Load employee data from the JSON file
    @GetMapping("/filter")
    public List<Item> filterItems(@RequestParam(required = false) String name,
            @RequestParam(required = false) String department) throws Exception {

        // Read JSON file from resources
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("employees.json");

        // Map JSON to List of Items
        ObjectMapper objectMapper = new ObjectMapper();
        List<Item> items = objectMapper.readValue(inputStream,
                objectMapper.getTypeFactory().constructCollectionType(List.class, Item.class));

        // Filter the items based on query parameters (name and department)
        return items.stream()
                .filter(item -> (name == null || item.getName().toLowerCase().contains(name.toLowerCase())) &&
                        (department == null || item.getDepartment().toLowerCase().contains(department.toLowerCase())))
                .collect(Collectors.toList());
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, API!";
    }
}
