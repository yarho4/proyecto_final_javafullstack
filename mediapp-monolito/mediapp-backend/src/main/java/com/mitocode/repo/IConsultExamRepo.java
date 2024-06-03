package com.mitocode.repo;

import com.mitocode.model.ConsultExam;
import com.mitocode.model.Exam;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IConsultExamRepo extends IGenericRepo<ConsultExam, Integer> {

//    @Transactional
    @Modifying
    @Query(value = "INSERT INTO consult_exam(id_consult, id_exam) VALUES(:idConsult, :idExam)", nativeQuery = true)
    Integer saveExam(@Param("idConsult") Integer idConsult, @Param("idExam") Integer idExam);

    @Query(value = "SELECT new com.mitocode.model.ConsultExam(ce.exam) FROM ConsultExam ce WHERE ce.consult.idConsult = :idConsult")
    List<ConsultExam> getExamsByConsultId(@Param("idConsult") Integer id);

     /*
    [
        {consult, exam},
        {consult, exam},
        {consult, exam}
    ]
     */
}
