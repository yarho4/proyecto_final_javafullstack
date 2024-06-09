package com.mitocode.dto;

import com.mitocode.model.Patient;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignosDTO {

    private Integer idSignos;

    @NotNull
    private LocalDateTime fecha;

    @NotNull
    private Patient patient;

    @NotNull
    @NotBlank
    private String temperatura;

    @NotNull
    @NotBlank
    private String pulso;

    @NotNull
    @NotBlank
    private String ritmo;
}
