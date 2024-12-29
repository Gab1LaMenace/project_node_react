import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import * as Highcharts from 'highcharts'; // Import Highcharts
import { SeriesBarOptions } from 'highcharts'; // Import the correct type for bar charts
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    AgGridAngular
  ],
  standalone: true
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  admins: any[] = [];
  totalAccounts: number = 0;
  rowData: any[] = []; // AG Grid row data

  // AG Grid column definitions
  colDefs: ColDef[] = [
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Password', field: 'password' }, // You may want to hide or avoid displaying this field
  ];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // Load account data from the AccountService
    this.loadAccountData();
    // Initialize the chart after loading account data
    this.initializeChart();
  }

  // Method to load account data
  loadAccountData(): void {
    const accounts = this.accountService.getAccounts(); // Fetch all accounts
    this.rowData = accounts; // All accounts will be displayed in the grid
    this.totalAccounts = accounts.length; // Total count of accounts

    // Separate users and admins for chart data and percentage calculations
    this.users = accounts.filter(account => account.role !== 'admin');
    this.admins = accounts.filter(account => account.role === 'admin');
  }

  // Method to initialize the Highcharts chart
  initializeChart(): void {
    const userPercentage = (this.users.length / this.totalAccounts) * 100;
    const adminPercentage = (this.admins.length / this.totalAccounts) * 100;

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar', // Bar chart
      },
      title: {
        text: 'User vs Admin Accounts',
      },
      xAxis: {
        categories: ['Users', 'Admins'],
      },
      yAxis: {
        title: {
          text: 'Percentage',
        },
      },
      series: [
        {
          name: 'Accounts',
          data: [userPercentage, adminPercentage], // Data for users and admins percentage
        },
      ] as SeriesBarOptions[], // Explicitly type series as Bar Options
    };

    Highcharts.chart('container', chartOptions); // Render chart to 'container' div
  }
}
