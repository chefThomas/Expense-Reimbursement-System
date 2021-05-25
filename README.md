# Expense-Reimbursement-System
## Project Description

The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement.
## Technologies Used

* AWS RDS (PostgreSQL) - version 10.16
* Apache Tomcat - version 8.5
* Java 8
* ReactJS - version 17.0

## Features
* Authorization/Authentication
* Managers can search for reimbursements by employee ID or name
  

To-do list:
* Receipt image upload and storage on AWS S3 bucket
* Table pagination
* Manager delete/archive reimbursements
* Employee search reimbursements by description
* Increase testing coverage
  

## Getting Started
### Datase Set-up
1. Create a free-tier AWS RDS following these steps outlined [here](https://github.com/210419-USF-BSN-Java/notes/blob/main/setup/aws.md)
2. Connect to the RDS and generate a schema with the sql script [here](https://github.com/chefThomas/Expense-Reimbursement-System/blob/main/sql%20scripts/db-schema.sql)
3. Add fake data with these sql scripts: [users](https://github.com/chefThomas/Expense-Reimbursement-System/blob/main/sql%20scripts/insert-users.sql)/[reimbursement types](https://github.com/chefThomas/Expense-Reimbursement-System/blob/main/sql%20scripts/insert-reimbursement-types.sql)

### Install Tomcat Server (8.5) 
1. [Source](https://tomcat.apache.org/download-80.cgi)

### Add and Assign Environment Variables to Local Environmentt
1. `AWS_RDS_URL` = the endpoint of the RDS provided by the RDS console
2. `AWS-RDS_USER` = the username you gave while creating the RDS
3. `AWS_RDS_PASS` = the password you gave while creating the RDS
### Import Project
#### Backend
1. Git clone this repo 
2. Import the Java project in `ers/` into your favorite Java IDE
3. Update the Maven project to install dependencies
4. Run `package` to create a WAR file
5. Add Tomcat server and start it
#### Frontend
1. Run `npm install` inside `ers-client/`
2. Run `npm start` 
3. A browser will open, displaying the login page.
   
## Usage
Usage of the application is straightforward. Login as manager or employee to request/approve/deny reimbursements.  


## License

This project uses the following license: [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License)
