# node_express_sandbox# 🐳 Node.js CSV API with PostgreSQL & Docker

This is a **Dockerized Node.js API** for **uploading CSV files**, **storing data in PostgreSQL**, and **retrieving data via API endpoints**. 



---

## 🚀 Tasks
✅ Upload CSV and preview first 10 rows  
✅ Store CSV data into PostgreSQL  
✅ Retrieve all stored data  
✅ Error handling & logging with Winston  
✅ Jest tests included  
✅ Dockerized   

---

# 🛠 **Project Setup with Docker**

## 1️⃣ **Install Docker**
If Docker is **not installed**, download it from:
🔗 [**Docker Download Page**](https://www.docker.com/get-started/)

## 2️⃣ Clone the Repository

git clone [<node-js-project>](https://github.com/Tunthiha/node_express_sandbox.git)
cd node_express_sandbox

## 3️⃣ Set Up Environment Variables


PORT=5002
DB_USER=postgres
DB_HOST=db
DB_DATABASE=express-csv
DB_DBPORT=5432
DB_PASSWORD=password

## 4 Run the Project with Docker

docker-compose up --build -d


## 5 API Routes & Endpoints

POST | /api/upload_data | Upload CSV & preview first 10 rows
POST | /api/store_data  | Store CSV data in database
GET  | /api/data        | Get all stored records
GET  | /api/data/:id    | Get a specific record

For Example : http://localhost:5002/api/data


