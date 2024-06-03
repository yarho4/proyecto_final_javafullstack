package com.mitocode.service;

import com.mitocode.model.Patient;
import com.mitocode.model.Signos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ISignosService extends ICRUD<Signos, Integer> {

    Page<Signos> listPage(Pageable pageable);
}
