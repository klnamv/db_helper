import React, { useState, useEffect } from 'react';
import './App.css';
const { Client } = require('@notionhq/client');

const notionApi = process.env.REACT_APP_NOTION_API;
const dbId = process.env.REACT_APP_DB_ID;

function App() {
  const [queryResult, setQueryResult] = useState('Loading...'); // Initial state

  useEffect(() => {
    const notion = new Client({ auth: notionApi });
    async function queryDatabase(databaseId: string, text: string) {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Problems",
            rich_text: {
              contains: text
            }
          }
        });
        return response.results[0]?.properties.Problems?.rich_text[0]?.plain_text || 'No data found';
      } catch (error : any) {
        console.error(error.body);
        return 'Failed to fetch data';
      }
    }

    if (dbId) {
      queryDatabase(dbId, "Element").then(result => {
        setQueryResult(result); // Update state with the result
      });
    } else {
      setQueryResult('Undefined database ID');
    }
  }, [dbId]); // useEffect will run when `dbId` changes

  return (
    <div className="App">
      <p>{queryResult}</p> {/* Render the state variable here */}
    </div>
  );
}

export default App;
