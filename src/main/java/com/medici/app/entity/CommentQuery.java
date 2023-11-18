package com.medici.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "comment_query")
public class CommentQuery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameUser;
    private String comment;
    @ManyToOne
    @JoinColumn(name = "county_natality_base_id")
    private CountyNatalityBase countyNatalityBase;

}
