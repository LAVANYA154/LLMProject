import { Component } from '@angular/core';
import { LicenseService } from '../license.service';
import { Details } from '../Details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css']
})
export class ActivateuserComponent {
  details: Details[] = [];
  showActivated: boolean = false; 
  constructor(private licenseService: LicenseService, private router: Router) {}

  ngOnInit(): void {
    this.licenseService.getAllrequestSoftware().subscribe(
      (data: Details[]) => {
        this.details = data;
        console.log(this.details);
      }
    );
    this.refreshData();
  }


  activateUser(detail: Details) {
    this.licenseService.useractivation(detail).subscribe(
      (response) => {
        console.log('User activation', response);
  
        // Toggle the showActivated flag to reload the data
        this.showActivated = !this.showActivated;
        this.refreshData();
        this.router.navigate(['/activateduser'])
      },
      (error) => {
        alert('Error user activation');
        console.error('Error user activation:', error);
      }
    );
    // console.log("sdfghj"+detail.username);
    this.licenseService.generateOtp(detail.username).subscribe();
    //
  }

  refreshData() {
    this.licenseService.getAllrequestSoftware().subscribe((data: Details[]) => {
      this.details = this.showActivated ? data.filter(d => d.status) : data.filter(d => !d.status);
      console.log(this.details);
    });
  }
  
  toggleShowActivated() {
    this.showActivated = !this.showActivated;
    this.refreshData();
  }
}
