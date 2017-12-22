import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the CreateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {
  isReadyToSave: boolean;
  url='http://localhost:3000/subjects';
  subject:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.subject = formBuilder.group({
      name: ['', Validators.required],
      studies: ['', Validators.required],
      quatrimestre: ['', Validators.required]
    });

    this.subject.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.subject.valid;
    });
  }

  createSubject() {
    let newSubject = {
        name: this.subject.controls['name'].value.toUpperCase(),
        studies: this.subject.controls['studies'].value,
        quatrimestre: this.subject.controls['quatrimestre'].value
    };

    this.http.post(this.url, newSubject, {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(resp => {
      this.viewCtrl.dismiss(newSubject);
    });
  }
}
