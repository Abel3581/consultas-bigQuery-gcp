export interface CountySearchIdResponse {

    //id: number;
    year: string;
    county_of_Residence: string;
    births: number;
    ave_Age_of_Mother: number;
    ave_OE_Gestational_Age_Wks: number;
    ave_LMP_Gestational_Age_Wks: number;
    ave_Birth_Weight_gms: number;
    ave_Pre_pregnancy_BMI: number;
    ave_Number_of_Prenatal_Wks: number;
    [key: string]: any;
}
// {
//   "year": "2017-01-01",
//   "ave_Age_of_Mother": 26.67,
//   "ave_LMP_Gestational_Age_Wks": 38.45,
//   "ave_Birth_Weight_gms": 3261.33,
//   "ave_OE_Gestational_Age_Wks": 38.33,
//   "ave_Pre_pregnancy_BMI": 28.08,
//   "ave_Number_of_Prenatal_Wks": 10.99,
//   "county_of_Residence": "Hidalgo County, TX",
//   "births": 12489.0
// }
