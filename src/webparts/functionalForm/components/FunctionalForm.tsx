import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import {Dialog} from "@microsoft/sp-dialog";
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { TextField,Slider ,PrimaryButton} from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker"
// import { Slider } from 'antd';
 interface IFunctionalFormState {
    Name:string;
    EmailAddress:string;
    Score:number|any;
    Age:number|any;
    Salary:number|any;
    Address:string;
    Manager:any; // mulitselect people
    ManagerId:any;
    Admin:any;
    AdminId:any;
   
}
const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
const [formdata,setFormData]=React.useState<IFunctionalFormState>({
   Name:"",
      Age:"",
      Salary:"",
      Score:0,
      Address:"",
      EmailAddress:"",
      Manager:[],
      ManagerId:[],
      Admin:"",
      AdminId:0,
});
const createItems=async()=>{
  try{
const web=Web(props.siteurl);
const lists=web.lists.getByTitle(props.ListName);
const items=await lists.items.add({
  Title:formdata.Name,
  EmailAddress:formdata.EmailAddress,
  Age:parseInt(formdata.Age),
  Salary:parseFloat(formdata.Salary),
  Score:formdata.Score,
  Address:formdata.Address,
  AdminId:formdata.AdminId,
  ManagerId:{results:formdata.ManagerId}
});
Dialog.alert(`Item created successfully with id: ${items.data.Id}`);
console.log(items);
setFormData({
   Name:"",
      Age:"",
      Salary:"",
      Score:0,
      Address:"",
      EmailAddress:"",
      Manager:[],
      ManagerId:[],
      Admin:"",
      AdminId:0,
});
  }
  catch(err){
console.log(err);
Dialog.alert(`Item creation failed`);
  }
}
//get admin
const getAdmin=(items:any[])=>{
if(items.length>0){
  setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
}
else{
  setFormData(prev=>({...prev,Admin:"",AdminId:0}))
}
}
//get Managers
const getManagers=(item:any)=>{
  const managerName=item.map((itm:any)=>itm.text);
  const managerId=item.map((itm:any)=>itm.id);
  setFormData(prev=>({...prev,Manager:managerName,ManagerId:managerId}))
}
//form event
const handleChange=(fieldValue:keyof IFunctionalFormState,value:string|boolean|number)=>{
  setFormData(prev=>({...prev,[fieldValue]:value}))
}
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,value)=>handleChange("Name",value||"")}
    />
    <TextField
    label='Email Address'
    value={formdata.EmailAddress}
    onChange={(_,value)=>handleChange("EmailAddress",value||"")}
    />
    <TextField
    label='Age'
    value={formdata.Age}
    onChange={(_,value)=>handleChange("Age",value||"")}
    />
    <TextField
    label='Salary'
    value={formdata.Salary}
    onChange={(_,value)=>handleChange("Salary",value||"")}
    prefix='$'
    suffix='USD'
    />
    <Slider
    label='Score'
    min={1}
    max={100}
    onChange={(value)=>handleChange("Score",value)}
    value={formdata.Score}
    />
     <PeoplePicker
        context={props.context as any}
        titleText="Manager"
        personSelectionLimit={3}
        showtooltip={true}
        onChange={getManagers}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
        webAbsoluteUrl={props.siteurl}
        defaultSelectedUsers={formdata.Manager}
        ensureUser={true}
        />
        <PeoplePicker
        context={props.context as any}
        titleText="Admin"
        personSelectionLimit={1}
        showtooltip={true}
        onChange={getAdmin}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
        webAbsoluteUrl={props.siteurl}
        defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
        ensureUser={true}
        />
         <TextField
    label='Address'
    value={formdata.Address}
    onChange={(_,value)=>handleChange("Address",value||"")}
    multiline
    rows={5}
    />
        <br/>
        <PrimaryButton text="Save" onClick={createItems} iconProps={{iconName:"save"}}/>
    </>
  )
}
export default FunctionalForm;
