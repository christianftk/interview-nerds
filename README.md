# interview-nerds
## Setting Up and Running the Library API

Follow these steps to set up and run the Library API on your local machine. The application uses a local MongoDB database, so ensure you have MongoDB installed and running.

### Prerequisites

1. Node.js and npm are installed on your machine.
2. MongoDB is installed and running locally. If not, you can download it from [here](https://www.mongodb.com/try/download/community) and follow the installation instructions for your OS.
3. There's 2 JSON (library.books and library.authors) which contains the few entries I've worked with during the challenge.

### Steps

1. Clone the repository from [GitHub Repo URL](your-github-repo-url).
2. Make sure your MongoDB is up and running.
3. I didn't push the node_modules in the repo so use

   npm i

4. To run the server write in the terminal
   
   npm run devStart

5. You should read the following if everything is properly connected

    Server running on http://localhost:8080
    Connected to Database

6. To test the APIs, check the .rest files in the root directories (you should populate the DB first using the POST requests)
