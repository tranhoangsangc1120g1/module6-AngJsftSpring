package student.data.demo.service;

import student.data.demo.model.Student;

import java.util.List;

public interface IStudentService {
    List<Student> findAll();
    Student findById(int id );
    void save(Student student);
    void remove(int id);

}
