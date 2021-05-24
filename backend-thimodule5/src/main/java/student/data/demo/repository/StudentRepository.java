package student.data.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import student.data.demo.model.Student;

public interface StudentRepository extends JpaRepository<Student,Integer> {
}
