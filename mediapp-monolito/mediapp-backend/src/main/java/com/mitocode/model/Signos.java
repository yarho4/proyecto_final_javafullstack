package com.mitocode.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Signos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idSignos;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "id_patient", nullable = false, foreignKey = @ForeignKey(name = "FX_SIGNOS_PATIENT"))
    private Patient patient;

    @Column(nullable = false)
    private String temperatura;

    @Column(nullable = false)
    private String pulso;

    @Column(nullable = false)
    private String ritmo;
}
