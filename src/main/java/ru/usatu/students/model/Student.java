package ru.usatu.students.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@Entity
@Table(name = "students")
@XmlAccessorType(XmlAccessType.FIELD)
public class Student {
    @Id
    @XmlElement(name = "id")
    private int id;
    @Column(name = "name")
    @XmlElement(name = "name")
    private String name;

    public Student() {}

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {return this.id;}
    public void setId(int id) {this.id = id;}
    public String getName() {return this.name;}
    public void setName(String name){this.name = name;}
}
