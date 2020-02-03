import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

interface File {
  time: Date;
  name: string;
}

const fileList = <File[]>[
  {
    time: new Date(),
    name: "filename1.txt"
  },
  {
    //yesterday
    time: new Date(new Date().setDate(new Date().getDate()-1)),
    name: "filename2.txt"
  },
  {
    //before yesterday
    time: new Date(new Date().setDate(new Date().getDate()-2)),
    name: "filename3.txt"
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  files = fileList;
  options: number[] = [1,2,3,4];
  selectedOption: number = 1;
  step: number = 1;
  formSubmitted:boolean = false;

  userForm: FormGroup;
  nameControl: AbstractControl;
  addressControl: AbstractControl;
  emailControl: AbstractControl;
  phoneControl: AbstractControl;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.createForm();
  }
  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$")]]
  });
  this.nameControl = this.userForm.controls['name'];
  this.addressControl = this.userForm.controls['address'];
  this.emailControl = this.userForm.controls['email'];
  this.phoneControl = this.userForm.controls['phone'];
  }

  back(){
    this.step = this.step - 1;
  }

  next(){
    this.step ++;
  }

  submitForm(tooltip){
    this.formSubmitted = true;
    this.getFormValidationErrors();
    if(!this.userForm.valid) {
      tooltip.open();
      return;
    }
    this.step ++
  }

  getFormValidationErrors() {
    Object.keys(this.userForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.userForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }
}
