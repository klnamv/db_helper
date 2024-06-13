import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import OpenAI from "openai";
import logo from '../assets/logo.svg';
import send_button from '../assets/send_button.svg';
import '../styles/Chat.sass'

const api_key = process.env.REACT_APP_OPENAI;
const openai = new OpenAI({apiKey: api_key, dangerouslyAllowBrowser: true});

const modelId: string = "gpt-3.5-turbo";  // Defining modelId outside the component
interface NotionTitleProperty {
  title: { plain_text: string }[];
}

interface NotionMultiSelectProperty {
  multi_select: { name: string }[];
}

interface NotionSelectProperty {
  select: { name: string };
}

interface NotionStatusProperty {
  status: { name: string };
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
    Status: NotionStatusProperty;
  };
}

interface NotionResponse {
  results: NotionPage[];
}

const dbDescription = `
"properties": {
  "Date": {
      "description": "The date when problem was solved",
      "id": "RbNO",
      "type": "date",
      "date": null,
      "isNullable": true
  },
  "Status": {
      "id": "_%5CyQ",
      "type": "status",
      "status": ["Done", "Not started", "In progress"]
  },
  "Difficulty": {
      "id": "hx%3A%5D",
      "type": "select",
      "choices":["easy", "medium", "hard", null]
  },
  "Topics": {
      "id": "mI%60w",
      "type": "multi_select",
      "multi_select": ["string", "math", "array", "sorting", "stack", "hash table"]
  },
  "Problems": {
      "description": "The title of the problem along with its number"
      "id": "title",
      "type": "title",
  }
}
`

const systemPrompt = `You're a helpful assistant that helps write JSON queries for the Notion DB API. 
User will write prompt for getting some information, and you will output JSON right away.
The structure of the DB is the following:
${dbDescription}
The example of the body of the request:
{
  "filter": {
    "property": "Date",
    "date": {
      "after": "2024-03-31"
    }
  }
}
And another example:
{
  "filter": {
    "and": [
      {
        "property": "Topics",
        "multi_select": {
          "contains": "Two pointers"
        }
      }
    ]
  }
}
And the last one:
{
  "filter": {
    "property": "Status",
    "status": {
      "equals": "Done"
    }
  },
  "sorts": [
    {
      "property": "Date",
      "direction": "ascending"
    }
  ],
  "page_size": 5
}
`

const dbId = process.env.REACT_APP_DB_ID;

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [outputGpt, setOutputGpt] = useState<string>('');
  const [problems, setProblems] = useState<{ id: string, name: string, topics: string, difficulty: string, date: string, status: string }[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }

  const handleSubmitGpt = async (): Promise<void> => {

    // check if API key is working
    // if (!process.env.REACT_APP_OPENAI) {
    //   console.error("OpenAI API key is not set in environment variables");
    // } else {
    //   console.log("Using OpenAI API key from environment variables");
    // }

    try {
      const customPrompt = `${input}`;
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt},
          { role: "user", content: customPrompt }],
        model: modelId,
        response_format: { "type": "json_object" },
      });
      const content = completion.choices[0].message.content;
      console.log(content);
      if (content !== null) {
        setOutputGpt(content);
      }
      const url = `http://localhost:4000/api/notion?path=databases/${dbId}/query`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(content),
        })
        const data: NotionResponse = await response.json();
        console.log("Notion data:", JSON.stringify(data, null, 2));

        const formattedProblems = data.results.map((page: NotionPage) => {
          // console.log("Processing page:", page);
          const problem = {
            id: page.id,
            name: page.properties.Problems?.title[0]?.plain_text || 'Unknown',
            topics: page.properties.Topics?.multi_select.map(topic => topic.name).join(", ") || 'Unknown',
            difficulty: page.properties.Difficulty?.select?.name || 'Unknown',
            date: page.properties.Date?.date?.start || 'Unknown',
            status: page.properties.Status?.status?.name || 'Unknown',
          };
          console.log('Formatted problem:', problem);
          return problem;
        });
        // console.log(formattedProblems);
        setProblems(formattedProblems);
    } catch (error) {
      console.error("Error fetching from OpenAI:", error);
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitGpt();
    }
  };

  return (
    <div className='main-container'>
      <header>
          <img src={logo} alt='logo' />
          <div className='logout'>Logout</div>
      </header>
      <main>
        <div className='output-container'>
          <div className='result'>Result</div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Topics</th> 
                  <th>Difficulty</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(problem => (
                  <tr key={problem.id}>
                    <td>{problem.name}</td>
                    <td>{problem.topics}</td>
                    <td>{problem.difficulty}</td>
                    <td>{problem.date}</td>
                    <td>{problem.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

        </div>
        <div className='input'>
          <input type='text' value={input} onChange={handleInputChange} onKeyDown={handleKeyPress} placeholder='Message to your Database...' />
          <img src={send_button} alt='send' />
        </div>

      </main>
      {/* <div className='gpt-container'>
        <div className='container'>
          <div className="output">
            <h3>Query:</h3>
            {outputGpt}
          </div>
          <div className='result'>
            <h3>Data:</h3>
            <ul>
                {problems.map(problem => (
                  <li key={problem.id}>{problem.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>*/}
    </div> 
  )
}

export default Chat;
