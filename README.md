## Application overview -

- A server API of a online restaurant system of booking and viewing tables .
- Having two panels -> User panel and the Admin panel 
- Admin having permissions of CRUD over tables and other normal user profiles.
- Using the redis caching system for the fast responses.

## Live Links -
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15798447-2f7593a2-52a8-44ed-a027-bda6521435f5?action=collection%2Ffork&collection-url=entityId%3D15798447-2f7593a2-52a8-44ed-a027-bda6521435f5%26entityType%3Dcollection%26workspaceId%3D2e4fcb4f-7df9-4eed-9c86-98718593d8c2#?env%5BRestaurant%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL3Jlc3RhdXJhbnQtc3RyaWtlLmhlcm9rdWFwcC5jb20iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InZhcmlhYmxlX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)

- **Postman Collections:** [https://www.getpostman.com/collections/2719e8faac19404fba2b](https://www.getpostman.com/collections/2719e8faac19404fba2b)
- **Hosted Link:** [https://restaurant-strike.herokuapp.com/](https://restaurant-strike.herokuapp.com/)

## Admin Panel Credentials -

**Email:** admin@gmail.com
**Password:** 123456789

## Setup Instructions

Now do the following to setup project
Make sure that you have redis and node installed on your system 

```bash
# clone the project

npm intsall

# go to the configuration folder open the file dev.env and set your variables MONGODB_URI and JWT_SECRET

# for running server in demo
npm run server

# for running server in actual mode
npm run start
```
