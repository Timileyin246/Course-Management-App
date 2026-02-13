Brief documentation explaining the application and how to use it

EXPLAINING THE APPLICATION

The course management application is a single page application that allows the user to add, view, edit and delete courses, as well as assign credit units to each course. This single page application is built using HTML, CSS and Vanilla JavaScript. It is built in such a way that each data is handled dynamically and persisted using local storage. It is also built in such a way that it works on and through different browsers.

It has a dashboard, being the default view, that shows the total courses - this displays the total number of courses added; total credit units - this displays the sum of all the credit units of all the courses added; and recent courses - this displays the 5 most recently added courses.

There is a button for adding courses which allows users to input course code, course title and assign credit unit to each course.

It also has a course button that shows the courses added when clicked. In this page there are two buttons, the edit and delete button. When the edit button is clicked, the user is allowed to edit course code, course title and credit unit in cases of incorrect data input. When the delete button is clicked, the user is allowed to remove courses. 

HOW TO USE THE APPLICATION

- Adding a Course
Click the "Add course" button in the header at the top right corner of the page and fill in the required fields:
Course Code: e.g CSC 101
Course Title: e.g Introduction to Computer Science
Credit Units: Allows user to input number for credit unit between 1-6
then,
Click "Add Course" to save or
Click "Cancel" to return to the dashboard without saving

- Viewing Courses
Click the "Courses" button
Here all the courses added will be displayed in a grid format
Each course card shows:
Course code
Course title
Credit units
Edit button
Delete button

- Editing a Course
Navigate to the Courses view by clicking on the courses button
Click the "Edit" button on course card of the course to be edited
A modal window will appear with the course details
Modify the information according to preference
Click "Save changes" to update or
Click "Cancel" or the "×" button to close without saving

- Deleting a Course
Navigate to the Courses view by clicking on the courses button
Click the "Delete" button on the course card of the course to be deleted
Confirm the deletion in the popup dialog provided at the top of the page after clicking on the delete button
The course will be permanently removed 
