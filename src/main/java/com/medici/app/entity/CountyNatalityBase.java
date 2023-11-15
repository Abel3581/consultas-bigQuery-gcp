package com.medici.app.entity;


import lombok.*;
import org.checkerframework.checker.units.qual.A;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Table(name = "county_natality")
public class CountyNatalityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String year;
    protected String county_of_Residence;
    protected String county_of_Residence_FIPS;
    protected String births;
    protected String ave_Age_of_Mother;
    protected String ave_OE_Gestational_Age_Wks;
    protected String ave_LMP_Gestational_Age_Wks;
    protected String ave_Birth_Weight_gms;
    protected String ave_Pre_pregnancy_BMI;
    protected String ave_Number_of_Prenatal_Wks;
    private String abnormalConditionsCheckedDesc;
    private String abnormalConditionsCheckedYN;
    protected String nameUser;
    protected String comment;
    protected String nameConsult;
    //nombre, comentario y el nombre de usuario
}
