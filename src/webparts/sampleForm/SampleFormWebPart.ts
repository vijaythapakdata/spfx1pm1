import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SampleFormWebPartStrings';
import SampleForm from './components/SampleForm';
import { ISampleFormProps } from './components/ISampleFormProps';

export interface ISampleFormWebPartProps {
  ListName: string;
  cityOptions:any;
}

export default class SampleFormWebPart extends BaseClientSideWebPart<ISampleFormWebPartProps> {

 

  public async render(): Promise<void> {
    const cityOpt=await this._getLookup();

    const element: React.ReactElement<ISampleFormProps> = React.createElement(
      SampleForm,
      {
    ListName:this.properties.ListName,
    siteurl:this.context.pageContext.web.absoluteUrl,
    context:this.context,
    cityOptions:cityOpt,
     departmentOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Department',this.properties.ListName),
      genderOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Gender',this.properties.ListName),
      skillsOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,'Skills',this.properties.ListName)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //get Choice Values
  private async _getChoiceValues(siteurl:string,fieldValue:string,ListName:string):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldValue}' `,
  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Error while fetching choice values: ${response.status}`);
}
const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((choice:any)=>({
  key:choice,
  text:choice
}));
    }
    catch(err){
      console.error(err);
      return [];

    }
  }

  //lookup 
  private async _getLookup():Promise<any[]>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,{
  method:'GET',
  headers:{
       'Accept':'application/json;odata=nometadata'
  }

});
if(!response.ok){
  throw new Error(`Error while fetching choice values: ${response.status}`);
}
const data=await response.json();
return data.value.map((city:{ID:string,Title:string})=>({
  key:city.ID,
  text:city.Title
}))
    }
    catch(err){
console.error(err);
return [];
    }
  }
}
