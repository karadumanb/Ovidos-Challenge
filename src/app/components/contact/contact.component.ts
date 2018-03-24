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
    if(valid){
      let ebody = value.name + ' has comment for you:\r\n' + value.comment + '\r\n\r\nThank you for your project.\r\n\r\n' + value.name.toUpperCase();
      ebody = encodeURIComponent(ebody);
      location.href = 'mailto:karadumanbaturay@gmail.com' +'?subject='+value.subject+'&body=' + ebody;
    } else {
      alert("Fill out the form correctly!")
    }
  }
}
