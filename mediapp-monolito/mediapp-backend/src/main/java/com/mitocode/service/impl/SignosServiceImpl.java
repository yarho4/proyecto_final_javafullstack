package com.mitocode.service.impl;

import com.mitocode.model.Signos;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.ISignosRepo;
import com.mitocode.service.ISignosService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignosServiceImpl extends CRUDImpl<Signos, Integer> implements ISignosService {

    //@Autowired
    private final ISignosRepo repo;// = new PatientRepo();

    @Override
    protected IGenericRepo<Signos, Integer> getRepo() {
        return repo;
    }

    @Override
    public Page<Signos> listPage(Pageable pageable) {
        return repo.findAll(pageable);
    }

}
