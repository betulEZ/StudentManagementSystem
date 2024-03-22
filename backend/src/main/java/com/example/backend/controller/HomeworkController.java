package com.example.backend.controller;
import com.example.backend.model.Homework;
import com.example.backend.service.HomeworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import java.io.IOException;
import java.util.Base64;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/homeworks")
public class HomeworkController {
    private final HomeworkService homeworkService;

    @PostMapping("/add")
    public String addFile(@RequestParam("title") String title,
                           @RequestParam("image") MultipartFile file)
            throws IOException {
        String id = homeworkService.addFile(title, file);
        return "redirect:/photos/" + id;
    }
    @GetMapping("/{id}")
    public String getFile(@PathVariable String id, Model model) {
        Homework file = homeworkService.getFile(id);
        model.addAttribute("title", file.getTitle());
        model.addAttribute("image",
                Base64.getEncoder().encodeToString(file.getFile().getData()));
        return "photos";
    }
}
