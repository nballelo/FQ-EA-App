import { Component } from '@angular/core';
import {MenuController, ModalController, NavController} from 'ionic-angular';
import { StudentPage } from "../student/student";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'students.html'
})
export class HomePage {
  url='http://localhost:3000/students';
  students;
  constructor(public navCtrl: NavController,private http:HttpClient, public modalCtrl: ModalController) {
    this.update();
  }
  update(){
    this.http.get(this.url).subscribe(data => {
      this.students=data;
    });
  }
  navigate(student) {
    let addModal = this.modalCtrl.create('StudentPage',student);
    addModal.onDidDismiss(item => {
      if (item) {
        this.students.push(item);
      }
    });
    addModal.present();
  }

  addItem() {
    let addModal = this.modalCtrl.create('CreateStudentPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.students.push(item);
      }
    });
    addModal.present();
  }

  getItems(ev) {
    console.log(ev)
    this.http.get('http://localhost:3000/search?name='+ev).subscribe(data => {
      this.students=data;
    });
  }
  private ordenar(){}
}
