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
@Entity(name = "AmountItem")
@Table(name = "amount_item")
public class AmountItem {

    
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sushi_id", referencedColumnName = "id", nullable = false)
	@Fetch(FetchMode.JOIN)
    private Sushi sushi;

    
    @Column(name = "amount",nullable = false)
    private int amount;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bill_id", referencedColumnName = "id", nullable = false)
	@Fetch(FetchMode.JOIN)
    private Bill bill;
    
    public AmountItem() {
        ;
    }

    public AmountItem(Sushi sushi, int amount, Bill bill) {
        this.sushi = sushi;
        this.amount = amount;
        this.bill = bill;
    }
}
