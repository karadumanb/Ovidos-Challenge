import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  
  @ViewChild('contactForm') form: any;

  constructor() { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: any, valid: boolean}){
    console.log(value);
    console.log(valid);
  }
}
