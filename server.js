const express = require('express');
const path = require('path');
const fs = require('fs');
const generate_uid = require('generate-unique-id');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for Notetaker Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notetaking Adding Notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

const NOTES_FILE = './db/db.json';

// GET Route for retrieving notes
app.get('/api/notes', (req, res) =>
    {
        console.log(req.method);
        console.log('Getting note data...');
        fs.readFile(NOTES_FILE, 'utf-8', (error, data) =>
        {
            // Check for error, and give a response in JSON if there were no errors
            error ? console.log(error) : res.json(JSON.parse(data));
        });
    }
);

// POST Route for submitting new note
app.post('/api/notes', (req, res) =>
{
    console.info(`${req.method} to add new note`);

    const { title, text } = req.body;

    // Check that there is data in the request's body contents
    if (req.body)
    {
        const new_note =
        {
            title,
            text,
            id: generate_uid()
        };

        console.log(new_note);
        console.log('About to read and append the file with posted content...');

        fs.readFile(NOTES_FILE, 'utf-8', (error, data) =>
        {
          	console.log(`Checking ${NOTES_FILE} for errors...`);
            if(error)
            {
                console.log(error)
            }
            else
            {
                let all_notes = JSON.parse(data);
                console.log(`Logging the file contents of ${NOTES_FILE}`);
                console.log(all_notes);
                all_notes.push(new_note);

				const stringified_notes =  JSON.stringify(all_notes, null, 4);
				console.log(stringified_notes);

                fs.writeFile(NOTES_FILE, stringified_notes, (error) =>
					error ? console.log(error) : console.info('The note was successfully overwritten')
				);
            }
        });

        const response =
        {
            status: 'success',
            body: new_note
        };

        res.status(201).json(response);

		console.log('Note added successfully');
    }
    else
        res.error('Error adding note');
        
    
});

app.listen(PORT, () =>
  console.log(`App listening at Port: ${PORT}`)
);