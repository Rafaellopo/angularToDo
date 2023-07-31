import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';

//imports
import { TaskList } from '../../model/task-list';
import { AtendList } from '../../model/atend-list';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements DoCheck {

  private apiURL: string = "http://localhost/atendimento/";

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public atendDataList: AtendList | any;



  constructor(private http: HttpClient) {
    console.log(this.listAnalistas());
  }


  ngDoCheck(): void {
    this.changeDoCheck();
  }



  public listAnalistas() {
    return this.http.get(`${this.apiURL}`);
  }

  public setEmitTaskList(event: string) {
    console.log("Evento: " + event);
    this.taskList.push({ task: event, checked: false });
  }


  // A somente o item atual
  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  // Apagar todos o itens da lista de tarefas
  public deleteAllItensTaskList() {
    const confirm = window.confirm("Você deseja realmente apagar todos os items?");
    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Task está vazia,  deseja deletar?");
      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  private changeDoCheck() {
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
    localStorage.setItem("list", JSON.stringify(this.taskList));
  }

}
