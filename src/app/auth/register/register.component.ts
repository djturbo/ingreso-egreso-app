import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor() { }


  saveFormData(frm: NgForm): void {
    console.log(frm.value);
  }

  ngOnInit() {
  }

}
