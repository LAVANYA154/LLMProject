import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from 'src/app/license.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlicense',
  templateUrl: './addlicense.component.html',
  styleUrls: ['./addlicense.component.css']
})
export class AddlicenseComponent implements OnInit {
  licenseForm: FormGroup;

  constructor(private fb: FormBuilder, private licenseService: LicenseService, private router: Router) {
    this.licenseForm = fb.group({
      name:new FormControl('',[Validators.required, Validators.minLength(8)]),
      description:new FormControl('',[Validators.required]),
      vendorName:new FormControl('',[Validators.required]),
      cost:new FormControl(0,[Validators.required]),
      validity:new FormControl(0,[Validators.required]),
      category:new FormControl('All',[Validators.required])
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  saveLicense(): void {
    if (this.licenseForm && this.licenseForm.get('category')?.value === 'All') {
      alert('Please select a valid category ("Device" or "Software")');
      return;
    }

    // Call addLicense method here
    this.licenseService.addLicense(this.licenseForm.value).subscribe((addedLicense) => {
      // Redirect to the license view page after adding
      this.router.navigate(['/view']);
    });
  }
}
