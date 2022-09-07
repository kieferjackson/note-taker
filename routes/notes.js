const fs = require('fs');
const notes = require('express').Router();

// GET Route for retrieving notes
notes.get('/', (req, res) =>
    {
        // TODO: Implement file reading
        fs.readFile();
    }
);

// POST Route for submitting new note
notes.post('/', (req, res) =>
{
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body)
    {
        const new_note =
        {
            title,
            text
        };
    }
    else
        res.error('Error adding note')  ;
        
    
});

module.exports = notes;