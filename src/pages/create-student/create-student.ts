import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HomePage } from "../students/students";

/**
 * Generated class for the CreateStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-student',
  templateUrl: 'create-student.html',
})
export class CreateStudentPage {
  url='http://localhost:3000/students';
  student: FormGroup;
  isReadyToSave: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.student = formBuilder.group({
      name: ['', Validators.required],
      address: [''],
      phone1: ['', Validators.required],
      phone2: [''],
      studies: ['', Validators.required]
    });

    this.student.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.student.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateStudentPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  createStudent() {
    let newStudent={
      name:this.student.controls['name'].value.toUpperCase(),
      address:this.student.controls['address'].value.toLowerCase(),
      phones:{home:this.student.controls['phone1'].value,work:this.student.controls['phone2'].value},
      studies:this.student.controls['studies'].value.toLowerCase()
    };
    console.log(newStudent);
    this.http.post(this.url,newStudent,{headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(resp => {
      this.viewCtrl.dismiss(newStudent);
    });
  }
}
