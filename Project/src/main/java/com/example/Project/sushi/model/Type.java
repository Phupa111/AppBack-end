package com.example.Project.sushi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity(name = "Type")
@Table(
    name = "type"

)
public class Type {

	@Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
	@Column(name = "type",nullable = false)
    private String type;
    
    
	public Type() {
		;
	}


	public Type(String type) {
		super();
		this.type = type;
	}
    
}
