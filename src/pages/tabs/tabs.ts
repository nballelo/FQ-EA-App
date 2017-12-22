import { Component } from '@angular/core';

import { AboutPage } from '../subjects/subjects';
import { HomePage } from '../students/students';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor() {

  }
}
