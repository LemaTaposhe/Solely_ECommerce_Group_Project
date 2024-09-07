export interface IDistrict {
    districtId: number;
    divisionId: number ;
   
    name: string ;
    type: string;
    location: string;
    isActive?: boolean 
}