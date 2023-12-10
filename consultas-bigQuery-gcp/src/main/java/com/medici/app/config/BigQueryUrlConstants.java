package com.medici.app.config;

public class BigQueryUrlConstants {

    public static final String GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` order by Year ASC;";
    public static final String GET_COUNTY_NATALITY_RESIDENCE_AND_BIRTHS = "SELECT County_of_Residence, Births FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 20";
    public static final String GET_ABNORMAL_CONDITIONS = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` order by Year ASC ";
    public static final String GET_ABNORMAL_CONDITIONS_FILTERS = "SELECT County_of_Residence, Births, Abnormal_Conditions_Checked_Desc, Ave_Age_of_Mother FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` LIMIT 20";
    public static final String GET_BY_YEAR_AND_BIRTHS = "SELECT Year, Births FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` order by Year ASC";
    public static final String GET_BY_CONGENITAL_ABNORMALITIES = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_congenital_abnormalities` order by Year ASC";
    public static final String Get_BY_FATHER_RACE = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_father_race` order by Year ASC";
    public static final String GET_BY_MATERNAL_MORBIDITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_maternal_morbidity` order by Year ASC";
    public static final String GET_BY_MOTHER_RACE = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_mother_race` order by Year ASC";
    public static final String GET_BY_PAYMENT = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment` order by Year ASC";
}
