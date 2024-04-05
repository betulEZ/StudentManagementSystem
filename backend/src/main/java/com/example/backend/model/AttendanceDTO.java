package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDTO {
    String description;
    AttendanceStatus status;
}
