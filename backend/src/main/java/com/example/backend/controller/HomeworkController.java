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
    public String addPhoto(@RequestParam("title") String title,
                           @RequestParam("image") MultipartFile image)
            throws IOException {
        String id = homeworkService.addPhoto(title, image);
        return "redirect:/photos/" + id;
    }
    @GetMapping("/{id}")
    public String getPhoto(@PathVariable String id, Model model) {
        Homework photo = homeworkService.getPhoto(id);
        model.addAttribute("title", photo.getTitle());
        model.addAttribute("image",
                Base64.getEncoder().encodeToString(photo.getImage().getData()));
        return "photos";
    }
}
