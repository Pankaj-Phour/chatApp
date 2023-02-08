import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
names:any = [];
blank:boolean = false;
opened:boolean = false;
messageList:any = [];
original:any = [];
inputForm:any = FormGroup;
selected:any;
  constructor(private fb:FormBuilder, private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.dialogRef.afterOpened.subscribe((data:any)=>{
      setTimeout(() => {
        this.opened = true;
      }, 100);
    })
    this.dialogRef.afterAllClosed.subscribe((data:any)=>{
      this.opened = false;
    });
    this.inputForm = this.fb.group({
      message: ['',Validators.required]
    })
    this.names.push({name:'Pankaj'},
    {name:'Ashwani'},
    {name:'Chandar Kant'},
    {name:'Chunnu'},
    {name:'Ashish'},
    {name:'Aman'},
    {name:'Rahul'},
    {name:'Ajay'},
    {name:'Morgan'},
    {name:'Anuj'},
    {name:'Nirmal'},
    {name:'Sam'},
    {name:'John'},
    {name:'Deeshan'},
    {name:'Mayank'},
    {name:'Nitin'},
    {name:'Surender'},
    {name:'Bruce'},
    {name:'Ramy'},
    {name:'Steve'},);
    for(let i=0; i<this.names.length; i++){
      this.names[i]['messageList'] = [];
    }
    this.selected = this.names[0];
    // console.log(this.names);
    this.original = this.names;
  }

  FilterNames(e:any){
      this.names = this.original;
    const data = e.target.value;
   this.names = this.names.filter((item:any)=>{
      return item.name.toLowerCase().includes(data.toLowerCase());
    });
    
    if(this.names.length<1){
      this.blank = true;
    }
    else{
      this.blank = false;
    }
    console.log(this.names,this.blank);
  }

  nameClick(e:any){
    console.log(e);
    this.selected = e;
    
  }
  send(){
    this.messageList.push({message:this.inputForm.value.message});
    this.selected.messageList.push({message:this.inputForm.value.message});
    this.inputForm.reset();
    this.names = this.original;
  }
  keyEnter(e:any){
    // console.log(e);
    if(e.keyCode == 13){
      this.send();
    }
    
  }


  // Function for opening menu for the more option icon 
  chatOptions(e:any){
    if(this.opened){
      // DO NOTHING 
    }else{

      const data = e=='single' ? [{name:'New Group'},{name:'Create a room'},{name:'Starred'},{name:'Settings'},{name:'Log out'}] : [{name:'Left Side'},{name:'Create a room'},{name:'Starred'},{name:'Settings'},{name:'Log out'}]
      const dialog = this.dialogRef.open(MenuBox,{
        height:'250px',
        width:'230px',
        data:data,
      })
    }
  }

  @HostListener('window:click')
  onNoClick(){
    console.log(this.dialogRef,this.opened);
   this.opened ?  this.dialogRef.closeAll() : ''
  }
}


export interface DialogData {
  data:String
}

@Component({
  selector:'app-main',
  templateUrl: './MenuBox.html',
  styleUrls: ['./main.component.scss']
})

export class MenuBox implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public Menu,
  public dialogRef: MatDialogRef<MenuBox>
  ){}
  ngOnInit(): void {
      console.log("Hello from MenuBOx",this.Menu);
      
  }
}
