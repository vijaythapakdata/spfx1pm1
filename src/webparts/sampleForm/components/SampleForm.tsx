import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import {Dialog} from "@microsoft/sp-dialog";
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { TextField ,Slider, PrimaryButton,Dropdown,ChoiceGroup} from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker"
// import { Dropdown } from 'antd';
// import { Slider } from 'antd';
export default class SampleForm extends React.Component<ISampleFormProps,ISampleFormState> {
  constructor(props:any){
    super(props);
    this.state={
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
      Department:"",
      Gender:"",
      City:"",
      Skills:[]
    }
  }
  //create form
  private async createForm(){
// read site url
let web=Web(this.props.siteurl); //url
await web.lists.getByTitle(this.props.ListName).items.add({
  Title:this.state.Name,
  EmailAddress:this.state.EmailAddress,
  Age:parseInt(this.state.Age),
  Salary:parseFloat(this.state.Salary),
  Score:parseInt(this.state.Score),
  Address:this.state.Address,
  ManagerId:{results:this.state.ManagerId},
  AdminId:this.state.AdminId,
  Department:this.state.Department,
  CityId:this.state.City,
  Gender:this.state.Gender,
  Skills:{results:this.state.Skills}
})
.then((data)=>{
  Dialog.alert("Data has been saved successully");
  console.log(data);
  this.setState({
    Name:"",
      Age:"",
      Salary:"",
      Score:0,
      Address:"",
      EmailAddress:"",
      Manager:[],
      ManagerId:[],
      Admin:"",
      AdminId:0
  })
})
.catch((err)=>{
   Dialog.alert("Error while creating the items");
  console.error(err);
});
  }

  //form event
  private handleForm=(fieldvalue:keyof ISampleFormState,value:string|boolean|number):void=>{
    this.setState({[fieldvalue]:value} as unknown as Pick<ISampleFormState,keyof ISampleFormState>)
  }

  //Get Manager
  private _getaManager=(items: any) :void=>{
  const managers=items.map((item:any)=>item.text)//text means display name
  const managersId=items.map((item:any)=>item.id)
  this.setState({
    Manager:managers,
    ManagerId:managersId
  });
}
private _getAdmin=(items:any[]):void=>{
if(items.length>0){
  this.setState({
    Admin:items[0].text,
    AdminId:items[0].id
  });
}
else{
  this.setState({
    Admin:"",
    AdminId:0
  });
}
}
  public render(): React.ReactElement<ISampleFormProps> {
    

    return (
     <>
     <form>
      <TextField
      value={this.state.Name}
      label='Name'
      onChange={(_,event)=>this.handleForm("Name",event||'')}
      iconProps={{iconName:'people'}}
      />
        <TextField
      value={this.state.EmailAddress}
      label='Email Address'
      onChange={(_,event)=>this.handleForm("EmailAddress",event||'')}
      iconProps={{iconName:'mail'}}
      />
        <TextField
      value={this.state.Age}
      label='Age'
      onChange={(_,event)=>this.handleForm("Age",event||'')}
      // iconProps={{iconName:'people'}}
      />
        <TextField
      value={this.state.Salary}
      label='Salary'
      onChange={(_,event)=>this.handleForm("Salary",event||'')}
      // iconProps={{iconName:'people'}}
      suffix='$'
      prefix='USD'
      />
      <Slider
      label='Score'
      value={this.state.Score}
      min={0}
      max={100}
      onChange={(event)=>this.handleForm("Score",event)}
      />
        <TextField
      value={this.state.Address}
      label='Permanent Address'
      onChange={(_,event)=>this.handleForm("Address",event||'')}
      iconProps={{iconName:'home'}}
      multiline
      rows={5}
      />
      <PeoplePicker
    context={this.props.context as any}
    titleText="Manager"
    personSelectionLimit={3}
    showtooltip={true}
    onChange={this._getaManager}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    webAbsoluteUrl={this.props.siteurl}
    defaultSelectedUsers={this.state.Manager}
    ensureUser={true}
    />
    <PeoplePicker
    context={this.props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={this._getAdmin}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    webAbsoluteUrl={this.props.siteurl}
    defaultSelectedUsers={[this.state.Admin?this.state.Admin:""]}
    ensureUser={true}
    />
    <Dropdown
    options={this.props.departmentOptions}
    selectedKey={this.state.Department}
    onChange={(_,options)=>this.handleForm("Department",options?.key as string)}
    label='Department'
    placeholder='--select'
    
    />
    <Dropdown
    options={this.props.cityOptions}
    selectedKey={this.state.City}
    onChange={(_,options)=>this.handleForm("City",options?.key as string)}
    label='City'
    placeholder='--select'
    
    />
    <ChoiceGroup
    options={this.props.genderOptions}
    selectedKey={this.state.Gender}
    onChange={(_,options)=>this.handleForm("Gender",options?.key as string)}
    label='City'
   
    
    />
      <br/>
      <PrimaryButton text='Save' onClick={()=>this.createForm()} iconProps={{iconName:'save'}}/>
     </form>
     </>
    );
  }

}
