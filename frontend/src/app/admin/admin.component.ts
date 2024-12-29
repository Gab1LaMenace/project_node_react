import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import {NgForOf} from '@angular/common'; // Import AccountService

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    NgForOf
  ]
})
export class AdminComponent implements OnInit {
  accounts: { username: string; email: string; password: string }[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // Fetch all registered accounts when the component initializes
    this.accounts = this.accountService.getAccounts();
  }
}
