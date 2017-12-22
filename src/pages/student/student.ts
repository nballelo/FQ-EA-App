import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  url='http://localhost:3000/students';
  edit:boolean;
  currentStudent;
  isReadyToSave:boolean;
  student;
  studentForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, formBuilder:FormBuilder,public viewCtrl: ViewController) {
    this.edit = false;
    this.student = this.viewCtrl.data;
    console.log(this.student)

    this.http.get(this.url+'/'+this.student.name).subscribe(data => {
      this.student = data;
      this.studentForm = formBuilder.group({
        name: [this.student.name, Validators.required],
        address: [this.student.address],
        phone1: [this.student.phones[0].home, Validators.required],
        phone2: [this.student.phones[0].work],
        studies: [this.student.studies, Validators.required]
      });

      this.studentForm.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.student.valid;
      });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

  editProfile() {
    this.edit = !this.edit ? true: false;
    if(!this.edit)
      this.student=this.currentStudent;
    else
      this.currentStudent=this.student;
  }
  update(){
    let newStudent={
      _id:this.student._id,
      name:this.studentForm.controls['name'].value.toUpperCase(),
      address:this.studentForm.controls['address'].value.toLowerCase(),
      phones:{home:this.studentForm.controls['phone1'].value,work:this.studentForm.controls['phone2'].value},
      studies:this.studentForm.controls['studies'].value
    };
    this.http.put(this.url,newStudent,{headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(resp => {
      this.viewCtrl.dismiss(newStudent);
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }
}
