import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {
  students;
  isReadyToSave: any;
  url='http://localhost:3000/subjects';
  currentSubject: any;
  edit: boolean;
  subject;
  subjectForm: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient, formBuilder:FormBuilder, public viewCtrl: ViewController) {
    this.subject = this.viewCtrl.data;
    this.http.get(this.url+'/name/'+this.subject.name).subscribe(data => {
      this.subject=data[0];
      this.subjectForm = formBuilder.group({
        name: [this.subject.name, Validators.required],
        studies: [this.subject.studies, Validators.required],
        quatrimestre: [this.subject.quatrimestre, Validators.required]
      });

      this.subjectForm.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.subjectForm.valid;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectPage');
  }



  editProfile() {
    this.edit = !this.edit ? true: false;
    if(!this.edit)
      this.subject=this.currentSubject;
    else {
      this.currentSubject=this.subject;
      this.http.get('http://localhost:3000/students').subscribe(data => {
        let currentStudents;
        currentStudents = data;
        for (var i=0;i<currentStudents.length;i++) {
          for(var j=0;j< this.subject.students.length;j++){
            if(this.subject.students[j].name===currentStudents[i].name)
              currentStudents.splice(i,1);
          }
        }
        this.students=currentStudents;
      });
    }
  }
  update(){
    let newSubject={
      _id:this.subject._id,
      name:this.subjectForm.controls['name'].value.toUpperCase(),
      studies:this.subjectForm.controls['studies'].value,
      quatrimestre:this.subjectForm.controls['quatrimestre'].value,
      students:this.subject.students
    };
    console.log(newSubject)
    this.http.put(this.url,newSubject,{headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(resp => {
      this.editProfile();
      this.viewCtrl.dismiss(newSubject);
    });
  }

  Add(student) {
    this.subject.students.push(student);
  }
  DeleteStudent(_id) {
    for (var i = 0; i < this.subject.students.length; i++) {
      if (this.subject.students[i]._id === _id)
        this.subject.students.splice(i, 1);
    }
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
