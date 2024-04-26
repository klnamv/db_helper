import React, { useState, useEffect } from 'react';
import { Client } from '@notionhq/client';
import './App.css';

interface NotionTitleProperty {
  title: { plain_text: string }[];
}

interface NotionMultiSelectProperty {
  multi_select: { name: string }[];
}

interface NotionSelectProperty {
  select: { name: string };
}

interface NotionDateProperty {
  date: { start: string };
}

interface NotionPage {
  id: string;
  properties: {
    Problems: NotionTitleProperty;
    Topics: NotionMultiSelectProperty;
    Difficulty: NotionSelectProperty;
    Date: NotionDateProperty;
    Status: NotionSelectProperty;
  };
}

interface NotionResponse {
  results: NotionPage[];
}

function App() {
  const [problems, setProblems] = useState<{
                          id: any;
                          name: any;
                      }[]>();

  const dbId = process.env.REACT_APP_DB_ID;
  if (!dbId) {
    throw new Error("no db id")
  }

  useEffect(() => {
    const fetchNotionData = async () => {

      try {
        const url = `http://localhost:4000/api/notion?path=databases/${dbId}/query`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: NotionResponse = await response.json();
        console.log(data.results)
        const formattedProblems = (data.results as any[]).map((page: NotionPage) => {
          return {
            id: page.id,
            name: page.properties.Problems?.title[0]?.plain_text,
          };
        });
        console.log(formattedProblems);
        if (formattedProblems === undefined) {
          throw new Error;
        }
        console.log()
        setProblems(formattedProblems);
      } catch (error) {
        console.error('Error fetching Notion data:', error);
        setProblems([]);
      }
    };

    fetchNotionData();
  }, []);
  
  return (
    <div className="App">
      <ol>
        {problems ? problems.map((problem) => (
          <li key={problem.id}>
            {problem.name}
          </li>
        )): <li></li>}
      </ol>
    </div>
  );
}

export default App;
