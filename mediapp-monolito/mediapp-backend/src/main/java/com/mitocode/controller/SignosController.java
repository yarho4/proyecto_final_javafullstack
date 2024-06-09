package com.mitocode.controller;

import com.mitocode.dto.SignosDTO;
import com.mitocode.model.Signos;
import com.mitocode.service.ISignosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/signos")

@RequiredArgsConstructor
public class SignosController {

    //@Autowired
    private final ISignosService service;// = new PatientService();
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    /*public PatientController(PatientService service) {
        this.service = service;
    }*/

    @GetMapping
    public ResponseEntity<List<SignosDTO>> findAll(){
        List<SignosDTO> list = service.findAll().stream().map(this::convertToDto).toList();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SignosDTO> findById(@PathVariable("id") Integer id){
        Signos obj = service.findById(id);

        return ResponseEntity.ok(convertToDto(obj));
        //return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> save(@Valid @RequestBody SignosDTO dto){
        Signos obj = service.save(convertToEntity(dto));

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdSignos()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SignosDTO> update(@Valid @PathVariable("id") Integer id, @RequestBody SignosDTO dto){
        dto.setIdSignos(id);
        Signos obj = service.update(id, convertToEntity(dto));

        return ResponseEntity.ok(convertToDto(obj));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        service.delete(id);

        return ResponseEntity.noContent().build(); //204 NO CONTENT
    }

    @GetMapping("/hateoas/{id}")
    public EntityModel<SignosDTO> findByIdHateoas(@PathVariable("id") Integer id){
        EntityModel<SignosDTO> resource = EntityModel.of(convertToDto(service.findById(id)));

        //generar un link informativo
        WebMvcLinkBuilder link1 = linkTo(methodOn(this.getClass()).findById(id));
        WebMvcLinkBuilder link2 = linkTo(methodOn(this.getClass()).findAll());

        resource.add(link1.withRel("patient-info-byId"));
        resource.add(link2.withRel("patient-all-info"));

        return resource;
    }

    @GetMapping("/pageable")
    public ResponseEntity<Page<SignosDTO>> listPage(Pageable pageable){

        Page<SignosDTO> page = service.listPage(pageable).map(this::convertToDto);

        return ResponseEntity.ok(page);
    }

    private SignosDTO convertToDto(Signos obj){
        return modelMapper.map(obj, SignosDTO.class);
    }

    private Signos convertToEntity(SignosDTO dto){
        return modelMapper.map(dto, Signos.class);
    }

}
