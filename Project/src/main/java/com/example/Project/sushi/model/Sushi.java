package com.example.Project.sushi.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity(name = "Sushi")
@Table(name = "sushi")
public class Sushi {
    

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
    
    @Column(name = "name",nullable = false)
    private String name;

    
    @Column(name = "price",nullable = false)
    private int price;

    
    @Column(name = "image",nullable = false)
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "type_id", referencedColumnName = "id", nullable = false)
	@Fetch(FetchMode.JOIN)
    private Type type;

    
    public Sushi() {
        ;
    }


    public Sushi(String name, int price, String image, Type type) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.type = type;
    }
}
