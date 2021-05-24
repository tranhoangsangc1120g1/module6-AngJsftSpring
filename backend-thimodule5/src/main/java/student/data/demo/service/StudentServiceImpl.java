package student.data.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import student.data.demo.model.Student;
import student.data.demo.repository.StudentRepository;

import java.util.List;

@Service
public class StudentServiceImpl implements IStudentService {
    @Autowired
    StudentRepository studentRepository;

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Student student) {
        studentRepository.save(student);
    }

    @Override
    public void remove(int id) {
        studentRepository.deleteById(id);
    }
}
