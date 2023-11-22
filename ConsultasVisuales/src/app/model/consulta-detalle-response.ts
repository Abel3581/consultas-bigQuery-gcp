export interface ConsultaDetalleResponse {

  id:string;
  year: string;
  county_of_Residence: string;
  county_of_Residence_FIPS: string;
  births: string;
  ave_Age_of_Mother: string;
  ave_OE_Gestational_Age_Wks: string;
  ave_LMP_Gestational_Age_Wks: string;
  ave_Birth_Weight_gms: string;
  ave_Pre_pregnancy_BMI: string;
  ave_Number_of_Prenatal_Wks: string;
  abnormalConditionsCheckedDesc: string;
  abnormalConditionsCheckedYN: string;
  [key: string]: string; // Índice de tipo de cadena para propiedades adicionales
}
