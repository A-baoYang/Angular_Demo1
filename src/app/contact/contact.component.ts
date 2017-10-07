import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, FormControlDirective } from '@angular/forms'

import { Feedback, ContactType } from './../shared/feedback';

import { flyInOut, expand } from './../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is Required.',
      'minlength': 'First Name needs at least 2 characters long.',
      'maxlength': 'First Name is at most 25 characters long.'
    },
    'lastname': {
      'minlength': 'Last Name needs at least 2 characters long.',
      'maxlength': 'Last Name is at most 25 characters long.'
    },
    'telnum': {
      'pattern': 'Tel. Number needs to uses only numbers.'
    },
    'email': {
      'required': 'Email is Required.',
      'email': 'This is not match the form of email.'
    },
    'message': {
      'required': 'Message is Required.'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      lastname: ['', [ Validators.minLength(2), Validators.maxLength(25) ]],
      telnum: ['', [ Validators.pattern ]],
      email: ['', [ Validators.required, Validators.email ]],
      agree: false,
      contacttype: 'None',
      message: ['', Validators.required]
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

}
