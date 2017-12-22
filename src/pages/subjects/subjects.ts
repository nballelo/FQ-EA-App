import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-about',
  templateUrl: 'subjects.html'
})
export class AboutPage {
  url='http://localhost:3000/subjects';
  graphs=[];
  subjects;
  subForm:FormGroup
  constructor(public navCtrl: NavController,private http:HttpClient, public modalCtrl: ModalController, formBuilder: FormBuilder) {
    this.update();
    this.subForm=formBuilder.group({
      quatrimestre:[''],
      studies:['']
    })

  }
  update(){
    this.http.get(this.url).subscribe(data => {
      this.subjects=data;
      this.grafics();
    });
  }
  navigate(subject){
    let addModal = this.modalCtrl.create('SubjectPage',subject);
    addModal.onDidDismiss(item => {
      if (item) {
       this.update();
      }
    });
    addModal.present();
  }
  filter(){

    if((this.subForm.controls['quatrimestre'].value)&&(this.subForm.controls['studies'].value)){
      alert("Only one filter");
    }
    else if(this.subForm.controls['quatrimestre'].value){
      this.http.get(this.url+'/quatrimestre/'+this.subForm.controls['quatrimestre'].value).subscribe(data => {
        this.subjects=data;
      });
    }
    else if(this.subForm.controls['studies'].value){
      console.log(this.subForm.controls['studies'].value)
      this.http.get(this.url+'/studies/'+this.subForm.controls['studies'].value).subscribe(data => {
        this.subjects=data;
      });
    }
    else this.update()
  }

  addItem() {
    let addModal = this.modalCtrl.create('CreateItemPage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.subjects.push(item);
      }
    })
    addModal.present();
  }

  grafics() {
    console.log(this.graphs)
    let totalStudents=0;
    for (let i=0;i<this.subjects.length;i++){
      totalStudents=totalStudents+this.subjects[i].students.length;
    }
    for (let i=0;i<this.subjects.length;i++){
      this.graphs.push({name:this.subjects[i].name,percentage:this.subjects[i].students.length/totalStudents})
    }
  }
}
