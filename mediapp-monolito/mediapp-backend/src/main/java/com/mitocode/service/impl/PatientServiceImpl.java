package com.mitocode.service.impl;

import com.mitocode.exception.ModelNotFoundException;
import com.mitocode.model.Patient;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IPatientRepo;
import com.mitocode.service.IPatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl extends CRUDImpl<Patient, Integer> implements IPatientService {

    //@Autowired
    private final IPatientRepo repo;// = new PatientRepo();

    @Override
    protected IGenericRepo<Patient, Integer> getRepo() {
        return repo;
    }

    @Override
    public Page<Patient> listPage(Pageable pageable) {
        return repo.findAll(pageable);
    }

    /*@Override
    public Patient save(Patient patient) {
        return repo.save(patient);
    }

    @Override
    public Patient update(Integer id, Patient patient) {
        //VALIDAR EL ID
        repo.findById(id).orElseThrow( () -> new ModelNotFoundException("ID NOT FOUND: " + id));
        return repo.save(patient);
    }

    @Override
    public List<Patient> findAll() {
        return repo.findAll();
    }

    @Override
    public Patient findById(Integer id) {
        return repo.findById(id).orElseThrow( () -> new ModelNotFoundException("ID NOT FOUND: " + id));
    }

    @Override
    public void delete(Integer id) {
        repo.findById(id).orElseThrow( () -> new ModelNotFoundException("ID NOT FOUND: " + id));
        repo.deleteById(id);
    }
*/


    /*public PatientService(PatientRepo repo) {
        this.repo = repo;
    }*/

    /*@Override
    public Patient validAndSave(Patient patient){
        if(patient.getIdPatient() == 0){
            return repo.save(patient);
        }else{
            return new Patient();
        }
    }*/
}
