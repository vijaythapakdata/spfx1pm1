import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleFormProps {
 ListName:string;
 context:WebPartContext;
 siteurl:string;
 genderOptions:any;//Radio button
 departmentOptions:any;//single selected dropdown
 skillsOptions:any;//multiselect dropdown
 cityOptions:any;//lookup column
}
