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
@Entity(name = "Bill")
@Table(name = "bill")
public class Bill {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "uid", referencedColumnName = "id", nullable = false)
	@Fetch(FetchMode.JOIN)
    private User user;

    @Column(name = "total_price",nullable = false)
    private int totalprice;
    
    public Bill() {
        ;
    }

    public Bill(User user, int totalprice) {
        this.user = user;
        this.totalprice = totalprice;
    }
    
   
    
}
