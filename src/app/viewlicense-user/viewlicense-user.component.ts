import { Component,OnInit } from '@angular/core';
import { LicenseService } from 'src/app/license.service';
import { License } from '../license/license.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewlicense-user',
  templateUrl: './viewlicense-user.component.html',
  styleUrls: ['./viewlicense-user.component.css']
})
export class ViewlicenseUserComponent implements OnInit{
  
  licenses: License[] = []; // Array to store all licenses
  username :string='';
  constructor(private licenseService: LicenseService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch all licenses from the database
    this.licenseService.getAllLicenses().subscribe(
      (licenses: License[]) => {
        this.licenses = licenses;
      },
      (error: any) => {
        console.error('Error fetching license details:', error);
      }
    );
    
  }
  clickedLicenses: { [licenseId: number]: boolean } = {};
  // Function to handle purchasing software
purchaseSoftware(licenses:License,username:any): void {
  // Show a confirmation dialog to confirm the purchase
  console.log("hii")
  this.route.paramMap.subscribe(params => {
   username = params.get('uname');
  console.log('Username:', username);
  console.log(licenses,username);
  this.clickedLicenses[licenses.id] = true;

  const confirmPurchase = confirm(`Purchase ${licenses.id}? for ${username} `);
  if (confirmPurchase) {
    // Send licenses and username to the server
    console.log(username);
    this.licenseService.getPurchaseDetails(licenses,username).subscribe(
      (response) => {
        // Handle the response from the server if needed
        
        console.log('Purchase response:', response);

        // TODO: Implement the actual purchase logic here, such as sending a request to a payment gateway,
        // updating user licenses, and handling the response
      },
      (error) => {
        alert('Error purchasing software');
        console.error('Error purchasing software:', error);
      }
    );
  }
});

}

}
