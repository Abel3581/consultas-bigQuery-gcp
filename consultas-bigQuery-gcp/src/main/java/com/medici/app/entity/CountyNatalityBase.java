package com.medici.app.entity;


import com.medici.app.dto.ConsultRequest;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Table(name = "county_natality_base")
public class CountyNatalityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameUser;
    private String comment;
    private String nameConsult;
    @OneToMany(mappedBy = "countyNatalityBase", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<CountyNatality> countyNatalities = new ArrayList<>();
    @OneToMany(mappedBy = "countyNatalityBase", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<CommentQuery> commentQueries = new ArrayList<>();
    public void addCountyNatality(CountyNatality natality){
        countyNatalities.add(natality);
    }
    public void addComment(CommentQuery commentQuery){
        commentQueries.add(commentQuery);
    }
}
