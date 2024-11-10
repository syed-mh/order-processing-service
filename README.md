# Orders Processing Service

This repository is my implementation of a hypothetical orders processing service.

The tech stack used for this implementation is:

1. **NodeJS** Express Typescript backend
2. **NextJS** frontend
3. **MySQL** database

---

## Setting up this project locally

Running this project locally requires very few configuration steps, though there are a few pre-requisites:

1. Ensure you have MySQL installed and running on your local or remote host
2. Ensure you have NodeJS installed

### Step 1: Install dependencies

Open up a terminal and navigate to the directory where you cloned the repository. Once done, install dependencies for the frontend and backend:

```bash
cd backend && npm i
cd ../frontend && npm i
```

### Step 2: Set up environment variables

Rename the `.env` files in the `frontend` and `backend` folders and fill in the relevant details for each.

### Step 3: Seed backend database entries

In order to start off with a database that has some data in it to work with, navigate to the `backend` folder and run the following command:

```bash
npm run seed
```

**NOTE:** Seeding the database will remove all data in the database for this service and repopulate it with randomized data. Only do this when you are starting the application for the first time, or if you are looking to purposely repopulate the data for testing purposes.

### Step 4: Run backend service

Navigate to the `backend` folder and run the following command to get the backend server up and running.

```bash
npm run build && npm start
```

If your environment variables are configured correctly, the server will be up and running now on port 4000.

### Step 5: Run frontend

Navigate to the `frontend` folder and run the following command to get the frontend up and running.

```bash
npm run build && npm start
```

---

## Noteworthy aspects

In this project, I would like to highlight a few files in particular:

### Frontend

1. `frontend/utils/axios.ts` contains my implementation of the retry mechanism known as "Exponential backoff", which allows clients to retry server calls that have failed for a short period of time without overloading the client's device or the server in the process.
2. `frontend/components/orderCard.ts` contains a number of functions that make use of react hooks for improved performance.

### Backend

1. `backend/seed.ts` is a file that contains the script required to pre-populate the database with randomized records that allow us to quickly move towards development and testing
2. `backend/utils/encryptPrimaryKeys.ts` contains the code for a recursive encryption function that runs on any outgoing data models. Conversely, any incoming IDs are decrypted by `backend/utils/decryptPrimaryKeys.ts`
3. `backend/controllers/order/createOrder.ts` and `backend/controllers/order/updateOrder.ts` both contain basic level field validation.
