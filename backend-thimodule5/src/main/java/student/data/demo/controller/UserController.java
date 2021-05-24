package student.data.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import student.data.demo.model.Student;
import student.data.demo.service.IStudentService;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    IStudentService studentService;

    @GetMapping("/studentList")
    public List<Student> getList(){
        return studentService.findAll();
    }

    @RequestMapping(value = "/studentList/create", method = RequestMethod.POST)
    public ResponseEntity<Void> createBlog(@RequestBody Student student, UriComponentsBuilder ucBuilder) {
        studentService.save(student);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/blogs/{id}").buildAndExpand(student.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
    @GetMapping(value = "/studentList/{id}")
    public ResponseEntity<Student> getStudentByID(@PathVariable("id") int id) {
        Student student = this.studentService.findById(id);
        if (student == null) {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }


    @RequestMapping(value = "/studentList/deleted/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteById(@PathVariable("id") int id) {
        Student student = studentService.findById(id);
        if (student == null) {
            System.out.println("Unable to delete. student with id " + id + " not found");
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        studentService.remove(id);
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }
    @RequestMapping(value = "/studentList/edit/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Student> updateStudent(@PathVariable("id") int id, @RequestBody Student student) {

        Student currentStudent = studentService.findById(id);

        if (currentStudent == null) {
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        currentStudent.setTen(student.getTen());
        currentStudent.setEmail(student.getEmail());
        currentStudent.setGiaoVien(student.getGiaoVien());
        currentStudent.setTenDeTai(student.getTenDeTai());
        currentStudent.setTenNhom(student.getTenNhom());
        currentStudent.setSdt(student.getSdt());
        studentService.save(currentStudent);
        return new ResponseEntity<Student>(currentStudent, HttpStatus.OK);
    }
}
