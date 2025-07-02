import * as React from 'react';
// import styles from './FirstWebPart.module.scss';
import type { IFirstWebPartProps } from './IFirstWebPartProps';
import {  TextField ,Dropdown, DropdownMenuItemType, ComboBox, ChoiceGroup,SearchBox, PrimaryButton, DefaultButton, IconButton,DatePicker,Slider,Toggle,SpinButton} from '@fluentui/react';
// import { Slider } from 'antd';
// import { DatePicker } from 'antd';
// import { Dropdown } from 'antd';
export default class FirstWebPart extends React.Component<IFirstWebPartProps> {

  public render(): React.ReactElement<IFirstWebPartProps> {
    return (
     <>
   <SearchBox
   placeholder='Search here....'
   iconProps={{iconName:'search'}}/>
   <br/>
   <hr/>
     <TextField
     label='Name'
     iconProps={{iconName:'people'}} // iconprops is property to give icon in textfield
     placeholder='Vijay Thapak'
     />
      <TextField
     label='Email Address'
     iconProps={{iconName:'mail'}} // iconprops is property to give icon in textfield
     placeholder='VijayThapak@gmail.com'
     type='email'
     />
      <TextField
     label='Password'
     type='password'
     />
      <TextField
     label='File'
     type='file'
     />
     <TextField
     label='Salary'
     prefix='$'
     suffix='USD'
     />
     <TextField
     label='Error'
     errorMessage='I am error'
     disabled={true}
     />
     <TextField label='Address'
     multiline
     rows={5}
     iconProps={{iconName:'home'}}
     />
<Dropdown
options={[
   { key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
  { key: 'B', text: 'Option b', data: { icon: 'Print' } },
  { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
  { key: 'D', text: 'Option d', data: { icon: 'Train' } },
  { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
  { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'More options', itemType: DropdownMenuItemType.Header },
  { key: 'F', text: 'Option f', data: { icon: 'Running' } },
  { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
  { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
  { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
  { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
]}
label='Custom Example'
multiSelect
/>
<ComboBox
options={[
   { key: 'Header', text: 'Options', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
  { key: 'B', text: 'Option b', data: { icon: 'Print' } },
  { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
  { key: 'D', text: 'Option d', data: { icon: 'Train' } },
  { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
  { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'More options', itemType: DropdownMenuItemType.Header },
  { key: 'F', text: 'Option f', data: { icon: 'Running' } },
  { key: 'G', text: 'Option g', data: { icon: 'EmojiNeutral' } },
  { key: 'H', text: 'Option h', data: { icon: 'ChatInviteFriend' } },
  { key: 'I', text: 'Option i', data: { icon: 'SecurityGroup' } },
  { key: 'J', text: 'Option j', data: { icon: 'AddGroup' } },
]}
allowFreeform
autoComplete='on'
label='Custom'
/>
<ChoiceGroup
options={[
  {key:'Male',text:'Male'},
  {key:'Female',text:'Female'}
]}
label='Gender'
/>
<DatePicker
label='Date'
/>
<Slider label='Score'
min={1}
max={100}
step={1}
/>
<Toggle label='Permission'
onText='ON' offText='OFF'
defaultChecked={true}
/>
<SpinButton label='Spinn'
min={1}
max={100}/>
<br/>
<PrimaryButton text='Save' iconProps={{iconName:'save'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
<DefaultButton text='Update' iconProps={{iconName:'edit'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
<IconButton iconProps={{iconName:'delete'}}/>
     </>
    );
  }
}
