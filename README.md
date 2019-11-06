# Introduction

This is my submission for the first project in "React" Udacity course. The starter project was forked from 'https://github.com/udacity/reactnd-project-myreads-starter'. I had ton of fun working on refactoring code into components and adding features. I liked this approach of designing a static template first then refactor it into a functional application. I have tried to follow the best practices as much as I could.

The project task was to transform the static page into a dynamic page.

# Live Demo

To test the last build of the app, click on this [link](https://ramib1234.github.io/my-reads/)

# MyReads App Features

In MyReads app the user have a virtual book library where he/she can move the books between shelves. there are three shelves as follows:
- Currently Reading
- Want to Read
- Read

Under each book there's a green arrow, if you click on it a listt of shelves will appear. Once you select any shelf, the book automatically moves to the desired shelf.

There's also a green plus sign on the bottom right corner. If you click on it, it'll take you to a search page where you can search for additional books. The books you find will be able to change shelves as well. Once you asign a shelf to a book in the search page, it'll reflect on you library page. If you want to remove a book from your library,simply change its shelf to 'none'. 

Book shelf states are maintained if you navigate to another page or refresh the page.

# Technology Used

This application was developed using the beautiful **React** framework

![React Logo](/public/images/react.png)


# Test Project

To get started testing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

# Notes

- When searching for books with no thumbnail a custom image will appear instead. Image avilable in 'public/images/noImage.jpg'