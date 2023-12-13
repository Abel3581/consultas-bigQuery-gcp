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

