# Store

Store is a full stack application built with Nodejs and PostgreSQL for an online store. This application has both frontend and backend components.

## Website link:
- [Frontend](http://elasticbeanstalk-us-east-1-250964198472.s3-website-us-east-1.amazonaws.com/)


## Getting started

### Prerequisites
The following tools need to be installed on your machine:

- [Node.Js](https://nodejs.org/en)
- [AWS CLI](https://aws.amazon.com/cli/)
- [EB CLI](https://github.com/aws/aws-elastic-beanstalk-cli-setup)
- [Postgres](https://www.postgresql.org/)

Furthermore, you need to have:
- an [Amazon Web Services](https://console.aws.amazon.com) account
- a [CircleCi](https://circleci.com/) account


### Clone the repository

Clone the repository on your local machine:

```
git clone https://github.com/HussainAlQurain/Store.git
```

### Create an S3 bucket

The application uses an S3 bucket to store the images so an AWS S3 Bucket needs to be created

#### Permissions

Save the following policy in the Bucket policy editor:

```JSON
{
 "Version": "2012-10-17",
 "Id": "Policy1565786082197",
 "Statement": [
 {
 "Sid": "Stmt1565786073670",
 "Effect": "Allow",
 "Principal": {
 "AWS": "__YOUR_USER_ARN__"
 },
 "Action": [
 "s3:GetObject",
 "s3:PutObject"
 ],
 "Resource": "__YOUR_BUCKET_ARN__/*"
 }
 ]
}
```
Modify the variables `__YOUR_USER_ARN__` and `__YOUR_BUCKET_ARN__` by your own data.

#### CORS configuration

Save the following configuration in the CORS configuration Editor:

```JSON
[
    {
        "AllowedHeaders": [
            "*",
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods"
        ],
        "AllowedMethods": [
            "POST",
            "GET",
            "PUT",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

### Create PostgreSQL database

We will create a PostgreSQL database using AWS RDS.

Once the database is created successfully, copy and save the database endpoint, master username, and password to your local machine. It will help your application discover the database.

later you will add the environment variables for the database credentials.

Edit the security group's inbound rule to allow incoming connections from anywhere (0.0.0.0/0). It will allow your local application to connect to the database.

Test the connection from your local PostgreSQL client.

## Deploy locally

Check the readme files in both backend and frontend to deploy the applications locally.


## Manual Deploy to EB

run the following to deploy the backend server:

create a set_env.bat in store-backend directory with the following content:

```
eb setenv POSTGRES_HOST=databaseurl POSTGRES_DB=postgres POSTGRES_TEST_DB=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=password ENV=dev BCRYPT_PASSWORD=anypassword SALT_ROUNDS=10 TOKEN_SECRET=secret-token
```

```
cd store-backend
eb init
npm run createeb
npm run setenv
```

Please note that you need to deploy the application without installing the packages as some packages will run differently when installed on windows and deployed to linux ec2.

Assuming you have the database ready, your application should start.

### To terminate use the following
```
eb list
eb terminate
```

## Frontend deployment

#### src/envrionments/environmets.ts is used for the baseUrl for the backend API

In src/envrionments/environment.ts update the baseUrl to use your elastic beanstalk domain.

Run the following:

```
npm run build
```

upload the dist folder using the following command:

```
aws s3 cp --recursive --acl public-read ./dist/my-store s3://mybucketname/
```

replace mybucketname with the corresponding value.

## Set up CircleCI

change the configurations in config.yml according to your environment.

In store-backend/package.json change the deploy script to use your elastic beanstalk environment name and application name correctly.

and push the repository and approve the workflow to deploy.

### for the first time you deploy using circleci you need to update the environment variables for circleci and for aws eb application environment properties:

#### CircleCI env:

```
AWS_ACCESS_KEY_ID: youraccesskey
AWS_DEFAULT_REGION: yourdefaultregion
AWS_SECRET_ACCESS_KEY: your secret access key
```
#### EB env:

##### database.json is used as the central configuration file for the backend

```
POSTGRES_HOST=database-host-url
POSTGRES_DB=postgres
POSTGRES_TEST_DB=full_stack_dev_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123123123
ENV=dev
BCRYPT_PASSWORD=random-password
SALT_ROUNDS=10
TOKEN_SECRET=anything-secret
```

change the values according to your information

