package com.medici.app.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Table(name = "county_natality")
public class CountyNatality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String year;
    private String county_of_Residence;
    private String county_of_Residence_FIPS;
    private String births;
    private String ave_Age_of_Mother;
    private String ave_OE_Gestational_Age_Wks;
    private String ave_LMP_Gestational_Age_Wks;
    private String ave_Birth_Weight_gms;
    private String ave_Pre_pregnancy_BMI;
    private String ave_Number_of_Prenatal_Wks;
    private String abnormalConditionsCheckedDesc;
    private String abnormalConditionsCheckedYN;
    @ManyToOne
    @JoinColumn(name = "county_natality_base_id") // Nombre de la columna que hace referencia al ID de CountyNatalityBase
    private CountyNatalityBase countyNatalityBase;
}
