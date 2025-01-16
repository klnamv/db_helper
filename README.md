# DB Chat 👩🏻‍💻
Chat with your NotionDatabase

With this web application, you can chat with your Notion Database and easily retrieve relevant information using natural language.

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/b3ebf0ff-a948-40f8-9009-d42110a5ab24" />

# Technologies 💻
- `LLM`
- `OpenAI API` 
- `Prompt engineering(few-shot learning)` 
- `NotionDatabase` 
- `React` 
- `TypeScript`

# Examples of Work 📝
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/ecbbf781-5dbb-4f27-adde-c9c365cc3685" />
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/6ae5c8ce-6052-4100-b706-1c875530b68f" />

# OpenAI API & Notion API Key 🔐
To interact with the GPT models, an API key from OpenAI is required. This key enables your application to authenticate requests to OpenAI's services, ensuring that usage is secure and measured.

**Acquiring an API Key**
1. Create an account at OpenAI.
2. Navigate to the API section and generate a new API key.
3. Once you have your key, you will use it in your environment file to authenticate API requests from your application.

**Setting Up Your API Keys**
In the root of your project:
1. Create a `.env` file.
2. Add the following lines: 
- `REACT_APP_OPENAI='your-api-key-here'`;
- `REACT_APP_NOTION_API = 'your-api-key-here'`;
- `REACT_APP_DB_ID = 'your-api-key-here'`.
3. This will allow your application to authenticate its requests to OpenAI.

# Running the Project 🚦
To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run <code>npm install</code> or <code>yarn</code> in the project directory to install the required dependencies.
3. Create `.env` file, inside write <code>REACT_APP_OPENAI_API_KEY='your-api-key-here'</code>
4. Run <code>npm run start</code> or <code>yarn start</code> to get the project started.
5. Open http://localhost:3000 (or the address shown in your console) in your web browser to view the app.
