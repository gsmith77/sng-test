# sng-test

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API, and Amazon DynamoDB tables. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

BEFORE YOU START! Text me at 409-651-2750 to get a Access Key ID and Secret Access Key for my AWS Account so that you can read & write DynamoDB. 

Run to set up AWS role to make DynamoDB calls:
```
rm -rf ~/.aws/credentials
aws configure
region: us-west-2
output: json
source ~/.bash_profile
```


Install local packages:
```
npm i
```

To run the backend locally use:
```
npm run start
```

Use Postman to hit the api routes
```
POST /vote
GET /votes
```
