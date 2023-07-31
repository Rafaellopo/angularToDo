import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input-add-itens',
  templateUrl: './todo-input-add-itens.component.html',
  styleUrls: ['./todo-input-add-itens.component.css']
})
export class TodoInputAddItensComponent implements OnInit {

  constructor() { }

  @Output() public emitItemTaskList = new EventEmitter();

  public addItemTaskList: string="";
  ngOnInit(): void {
  }

  public submitItemTaskList(){
    //console.log(this.addItemTaskList);
    this.addItemTaskList = this.addItemTaskList.trim();
   if(this.addItemTaskList){
    this.emitItemTaskList.emit(this.addItemTaskList);
    this.addItemTaskList = "";
  }
  }
}
