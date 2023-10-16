package ru.usatu.students.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import ru.usatu.students.model.Student;


@Service
public class StudentServiceCollection {
    private List<Student> students = new ArrayList<>();

    public StudentServiceCollection() {
        students.add(new Student(1, "Tyler Durden"));
        students.add(new Student(1, "Marla Zinger"));
        students.add(new Student(1, "Narrator"));
    }

    public List<Student> getStudents() {return students;}

    public Student getStudent(int id) {
        return students.stream().filter(student -> student.getId() == id).findFirst()
                .orElse(new Student());
    }

    public Student addStudent(Student student) {
        students.add(student);
        return student;
    }

    public Student editStudent(int id, String name) {
        return students.stream().filter(student -> student.getId() == id).findFirst()
                .map(student -> {
                    student.setName(name);
                    return student;
                }).orElse(new Student());
    }

    public void deleteStudent (int id) {
        students = students.stream().filter(student -> student.getId() != id)
                .collect(Collectors.toList());
    }
}
