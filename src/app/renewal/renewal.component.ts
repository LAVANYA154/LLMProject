import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from '../license.service';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit{
  renewalForm:FormGroup;

  constructor(private formBuilder: FormBuilder,private licenseservice:LicenseService) {
    this.renewalForm = this.formBuilder.group({
      id:new FormControl('',[Validators.required, Validators.min(1)]),
      username:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    
  }

  onSubmitRenewal() {
    if (this.renewalForm.valid) {
      const id = this.renewalForm.get('id')?.value;
      const username = this.renewalForm.get('username')?.value;

      // Call the user service to handle the renewal
      this.licenseservice.renewUserLicense(id, username).subscribe((response) => {
        // Handle the response as needed
        alert('License has been updated')
        console.log('Renewal submitted with data:', response);
      },
      (error)=>{
        alert('You already requested the license');
        console.error('Error:', error);


      }
      );

    }
  }

  onSubmitDecline() {
    if (this.renewalForm.valid) {
      const confirmDelete = confirm('Are you sure you want to delete this license?');

  if (confirmDelete) {
  
    const id = this.renewalForm.get('id')?.value;
    const username = this.renewalForm.get('username')?.value;

      this.licenseservice.declineLicense(id, username).subscribe((response) => {
       console.log('Deleted successfully',response);
      // Remove the license from the list after successful deletion
      // const index = this.licenses.findIndex(license => license.id === id);
      // if (index !== -1) {
      //   this.licenses.splice(index, 1);
      // }
    },
    error => {
      console.error('Error deleting license:', error);
    }
    );}
}
}
}