# PDF Summarizer

## 1. Project Description

**PDF Summarizer** is a web application that allows users to upload PDF files and generate concise text summaries. Users can also view previously generated summaries and access their uploaded PDF files. The project consists of two main components:
- **Frontend**: A user-friendly interface built with modern web technologies.
- **Backend**: A server that processes PDF files and generates summaries.

## 2. Setup Instructions

### Prerequisites
- Node.js `18.18.0`

### Frontend Setup
1. Navigate to the `frontend` directory:

2. Install dependencies:
    
    ```
    npm install
    ```
    
3. Create a **`.env`** file in the **`/frontend`** directory and copy the contents from **`.env-example`**.
   Configure the following environment variable:
    
    ```
    VITE_API_URL=http://localhost:3000  # Backend API URL
    ```
    
5. Run the application (by default is accessible at **`http://localhost:5173`**):
    - **Development mode**:
        
        ```
        npm run dev
        ```
    - **Production build**:
        
        ```
        npm run build
        npm run serve
        ```
        
### **Backend Setup**

1. Navigate to the **`backend`** directory;
2. Install dependencies:
    ```
    npm install
    ```
    
3. Create a **`.env`** file in the **`/backend`** directory and copy the contents from **`.env-example`**. Configure the environment variables as needed.
4. Run the application (by default is accessible at **`http://localhost:3000`**):
    - **Development mode**:
        ```
        npm run start:dev
        ```
        
    - **Production build**:
        ```
        npm run build
        npm run start:prod
        ```

## **3. Docker Usage**

The project includes a **`docker-compose.yml`** file for easy containerization. You can run both frontend and backend services together or separately.

### **Running Both Services**

```
docker-compose up
```

### **Running Services Separately**

- Frontend only:
    ```
    docker-compose up frontend
    ```
    
- Backend only:
    ```
    docker-compose up backend
    ``` 

### **Accessing the Application**

- Frontend: **`http://localhost:5173`**
- Backend: **`http://localhost:3000`**

## **4. API Documentation**

### **Base URL**

**`http://localhost:3000/summaries`**

### **Endpoints**

### **`GET /summaries`**

- **Description**: Get all summaries
- **Query Parameters**:
    - **`take`** (optional): Limit number of results
- **Response**:
    ```
    [
      {
        "id": 1,
        "title": "Generated summary title",
        "text": "Generated summary text...",
        "file": "generated-file-name.pdf"
      }
    ]
    ```

### **`GET /summaries/:id`**

- **Description**: Get a single summary by ID
- **Response**:
    ```
    {
       "id": 1,
       "title": "Generated summary title",
       "text": "Generated summary text...",
       "file": "generated-file-name.pdf"
    }
    ```

### **`POST /summaries`**

- **Description**: Upload a PDF file and generate summary
- **Content-Type**: **`multipart/form-data`**
- **Request Body**:
    - **`file`**: PDF file to upload
- **Success Response**:
    ```
    {
       "id": 1,
       "title": "Generated summary title",
       "text": "Generated summary text...",
       "file": "generated-file-name.pdf"
    }
    ```
    
- **Error Responses**:
    - **`400 Bad Request`** if no file uploaded
    - **`415 Unsupported Media Type`** if file is not PDF

### **`DELETE /summaries/:id`**

- **Description**: Delete a summary by ID
- **Success Response**: **`204 No Content`**

### **Static Files Access**

### **`GET /public/files/:filename`**

- **Description**: Access previously uploaded PDF files
- **Response**:
    - Returns the PDF file as a downloadable attachment
    - If the file doesn't exist, returns **`404 Not Found`**

**Example Request**:
```
GET /public/files/document.pdf
```

**Notes**:

- Files are stored in the backend's **`public/files`** directory
- Filenames should match exactly (case-sensitive)