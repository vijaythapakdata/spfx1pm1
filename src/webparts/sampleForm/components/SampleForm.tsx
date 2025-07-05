import * as React from 'react';
// import styles from './SampleForm.module.scss';
import type { ISampleFormProps } from './ISampleFormProps';
import { ISampleFormState } from './ISampleFormState';
import {Dialog} from "@microsoft/sp-dialog";
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { TextField ,Slider, PrimaryButton} from '@fluentui/react';
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
      EmailAddress:""
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
  Address:this.state.Address
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
      EmailAddress:""
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
      <br/>
      <PrimaryButton text='Save' onClick={()=>this.createForm()} iconProps={{iconName:'save'}}/>
     </form>
     </>
    );
  }
}
