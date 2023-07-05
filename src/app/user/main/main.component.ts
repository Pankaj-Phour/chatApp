import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
names:any = [];
date:any;

blank:boolean = false;
opened:boolean = false;
messageList:any = [];
months:any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
isEmojiPickerVisible: boolean;
original:any = [];
days:any = ['Tuesday','Monday','Sunday','Today','Yesterday'];
nameList:any = ['Richard','Luis Fonsi','John','Smith','Billy','Sam','Steve','Tony','David','Bruce','Jimmy','John wick','Steve Rogers','Barton','Chris','Pankaj Phour','Ashwani Kumar','Chandar Kant','Surender Rawat','Ashish Chanchlani','Deeshan Sharma','Nitin Gadkari','Chunnu Kumar','Mayank Malkoti','Kundan Jha'];
inputForm:any = FormGroup;
selected:any;
public textArea: string = '';
  constructor(private fb:FormBuilder, private dialogRef:MatDialog, private _as:AuthService) { }

  ngOnInit(): void {

    this._as.allUsers('/allusers').subscribe((next:any)=>{
      // console.log("All users response",next);
      this.names = [...next.response];
      // console.log(this.names);
      
      for(let i=0; i<next.response.length; i++){
        this.names[i].index = i;
        this.names[i].lastMessage = this.days[Math.round(Math.random()*5)]
      }
      this.names.map((data:any)=>{
        return data.lastMessage === undefined ? data.lastMessage = 'Yesterday' : ''
      })
      this.selected = this.names[0];
      // console.log(this.names);
      this.original = this.names;
    })
    const date = new Date();
    this.date = date.toString().substring(8,10) + ' ' + this.months[date.getMonth()] + ' ' + date.getFullYear();
    
    this.inputForm = this.fb.group({
      message: ['',Validators.required]
    })
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
    // console.log(this.names,this.blank);
  }

  nameClick(e:any){
    // console.log(e);
    this.selected = e;
    const input = document.getElementById('inputBox') as HTMLInputElement;
    input.focus();
    input.value = this.selected.sending;
    this.inputForm.get('message').setValue(this.selected.sending);
  }
  send(){
    this.textArea = '';
    if(this.inputForm.value.message){
      this.messageList.push({message:this.inputForm.value.message});
      this.selected.messageList.push({message:this.inputForm.value.message});
      this.inputForm.reset();
      this.names = this.original;
      this.names[this.selected.index].typing = false;
    }
    else{
      // console.log("Can't send Empty message");
    }
  }

  mouseEnter(e:any){
    // console.log("Focus in",e);
    // this.names[this.selected.index].typing = true;
  }
  mouseLeave(e:any){
    // console.log("Focus out",e);
    // this.names[this.selected.index].typing = false;
  }
  keyEnter(e:any){
    // console.log(e);
    this.names[this.selected.index].typing = true;
    if(e.keyCode == 13){
      this.send();
    }
  }
  messageInput(e:any){
    // console.log(e);
    this.names[this.selected.index].sending = e.target.value;
  }


  // Function for opening menu for the more option icon 
  chatOptions(e:any){
    let left;
    e == 'single' ? left = false : left = true;

      const data = !left ? [{name:'Report'},{name:'Block'},{name:'Clear Chat'},{name:'Export Chat'},{name:'Add to shortcuts'}] : [{name:'New Group'},{name:'Create a room'},{name:'Starred'},{name:'Settings'},{name:'Log out'}]
      const dialog = this.dialogRef.open(MenuBox,{
        height:'250px',
        width:'230px',
        data:data,
        position:{top:'3%',left: left ? '10%' : '84.5%'}
      })
  }

  emojiBoxToggle(){
    setTimeout(() => {
      
      this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
    }, 10);
  }

  // ******************************************* This function is to close the popup dialog while clicking anywhere on the screen *******************************************
  @HostListener('window:click')
  onNoClick(){
    // console.log(this.dialogRef,this.isEmojiPickerVisible);
   this.isEmojiPickerVisible ?  this.isEmojiPickerVisible = false : ''
  }

  // Code for the Emoji Part 
   addEmoji(event) {
      this.textArea = `${this.textArea}${event.emoji.native}`;
      // this.isEmojiPickerVisible = true;
      const input = document.getElementById('inputBox') as HTMLInputElement;
      input.value += this.textArea;
      // console.log(input,input.value,this,this.textArea);
      this.inputForm.get('message').setValue(input.value)
      
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
  public dialogRef: MatDialogRef<MenuBox>, private router:Router,private _as:AuthService){}
  ngOnInit(): void {
      // console.log("Hello from MenuBOx",this.Menu);
      
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['../']);
    console.log("Loggin out");
    this._as.obNotify({
      start:true,
      code:200,
      status:'success',
      message:'Logged out Successfully'
    })
    this.dialogRef.close();
  }
}
