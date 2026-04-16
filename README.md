# Student Record Management System

This mini project implements a **Student Record Management System** in two forms:

1. A **C-based console application** (`miniProject.c`) that stores and retrieves student records from `students.txt`.
2. A **web-based interface** (`index.html`, `main.js`, `style.css`) that simulates the same workflow with a modern dashboard UI.

## Features

### C Console Application
- Add a student (roll number, name, marks)
- View all saved students
- Search student by roll number
- File-based storage using `students.txt`

### Web Application
- Dashboard with total students, average marks, and highest marks
- Add student form with validation
- View records in a table
- Search student by roll number
- Delete individual records
- Clear all in-memory records
- Responsive sidebar-based UI

## Project Structure

```text
.
├── README.md
├── index.html          # Web app layout and sections
├── style.css           # Web app styling
├── main.js             # Web app logic and student data handling
├── miniProject.c       # C console implementation
├── students.txt        # Data file used by C program
└── Technical Training Mini Project Report.docx
```

## How to Run

### Run the C Program

```bash
gcc miniProject.c -o miniProject
./miniProject
```

> On Windows, run `miniProject.exe` after compiling.

### Run the Web Interface

Open `index.html` directly in a browser.

## Notes

- The **C app** uses persistent file storage (`students.txt`).
- The **web app** currently uses an in-memory JavaScript array (data resets on refresh).
