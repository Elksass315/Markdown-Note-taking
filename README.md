
# Markdown-Note-taking Backend

A simple and efficient back-end service for note-taking with Markdown, built with Node.js. This service provides several endpoints for creating, saving, and rendering notes, as well as checking grammar and handling user authentication.

## Features

- **Grammar Check Endpoint**: Allows you to check the grammar of a note.
- **Save Notes Endpoint**: Save notes in Markdown format.
- **Render Markdown**: Convert Markdown notes to HTML and retrieve the rendered version.
- **Authentication**: User authentication to access the endpoints securely.

## API Endpoints

### 1. Grammar Check Endpoint

- **URL**: `/api/grammar-check`
- **Method**: `POST`
- **Description**: Checks the grammar of the submitted Markdown note.
- **Request Body**:
  ```json
  {
    "note": "Your markdown note text here."
  }
  ```

### 2. Save Note Endpoint

- **URL**: `/api/save-note`
- **Method**: `POST`
- **Description**: Saves the note passed in as Markdown text.
- **Request Body**:
  ```json
  {
    "title": "Note Title",
    "content": "Markdown formatted content"
  }
  ```
- **Response**: A confirmation that the note has been saved successfully.

### 3. Render Markdown Endpoint

- **URL**: `/api/render-note`
- **Method**: `POST`
- **Description**: Converts the Markdown note into an HTML version and returns it.
- **Request Body**:
  ```json
  {
    "content": "Markdown formatted content"
  }
  ```
- **Response**: The HTML-rendered version of the note.

### 4. Authentication Endpoint

- **URL**: `/api/auth`
- **Method**: `POST`
- **Description**: Authenticates the user to access protected routes.
- **Request Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**: A JWT token for future requests.

## Full API Documentation

You can see the full API docs by running the service and navigating to:

```bash
http://localhost:${PORT}/api-docs
```

## How to Run

1. Clone the repository:

   ```bash
   git clone https://https://github.com/Elksass315/Markdown-Note-taking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables.

4. Run the application:

   ```bash
   npm start
   ```


## License

This project is licensed under the MIT License.
