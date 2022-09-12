const fs = require('fs');
const notes = require('express').Router();
const generate_uid = require('generate-unique-id');

const NOTES_FILE = './db/db.json';

console.log('Currently on on the notes.js file...');

// GET Route for retrieving notes
notes.get('/', (req, res) =>
    {
        console.log(req);
        console.log('About to read the file data...');
        fs.readFile(NOTES_FILE, 'utf-8', (error, data) =>
        {
            console.log(data);
            // Check for error, and give a response in JSON if there were no errors
            error ? console.log(error) : res.json(JSON.parse(data));
        });
    }
);

// POST Route for submitting new note
notes.post('/', (req, res) =>
{
    console.log(req.body);

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
            error ? console.log(error) : () =>
            {
                const all_notes = JSON.parse(data);
                all_notes.push(new_note);

                fs.writeFile(NOTES_FILE, all_notes);
            }
        })

        res.json('Note was added successfully!');
    }
    else
        res.error('Error adding note')  ;
        
    
});

module.exports = notes;