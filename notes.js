const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)


    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNote(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = () => {
    const notes = loadNotes()
    const foundNote = notes.filter(({title}) => title !== title)


    if(notes.length > foundNote.length)
    {
        saveNote(foundNote)
        console.log(chalk.green.inverse('Note Removed!!'))
    } else {
        console.log(chalk.red.inverse('Note not Found!!'))
    }
}



const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.green.inverse('Your notes'))
    const output = notes.forEach(({title, body}) => console.log('Title: ' + title + ' | Body: ' + body))
    
  
}

const saveNote = (notes) => {
        const data = JSON.stringify(notes)
        fs.writeFileSync('notes.json', data)
}

const loadNotes = () => {
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const readNote = () => {
    const notes = loadNotes()
    const note = notes.find(({title}) => title === title)

    if (note) {
        console.log(chalk.inverse(note.title + ' | ' + note.body))
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}