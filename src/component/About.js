import React from 'react';

const About = () => {
  return (
    <div style={styles.container} className='container'>
      <h1>About Us</h1>
      <p>Welcome to INOTEBOOK, your personal tool for managing your tasks and staying organized. We believe that simplicity and efficiency are the keys to staying productive, and we've designed our platform to help you focus on what truly matters.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Create To-Do Lists:</strong> Organize your day, week, or projects with ease. You can quickly add tasks, ensuring that no important task is forgotten.
        </li>
        <li>
          <strong>Add and Manage Notes:</strong> Need to jot down some quick information? Our note-taking feature allows you to create, edit, and delete notes in just a few clicks.
        </li>
        <li>
          <strong>Edit and Update Tasks:</strong> Life is unpredictable, and plans often change. With our easy-to-use interface, you can edit or update your to-do list as needed to adapt to your changing schedule.
        </li>
        <li>
          <strong>Delete Unwanted Items:</strong> Keep your task list clean and clutter-free. Easily remove completed or irrelevant tasks with our delete function.
        </li>
        <li>
          <strong>Secure Login and Signup:</strong> Your data security is our priority. Sign up with a secure login process, and rest easy knowing that your personal information and tasks are protected with us.
        </li>
      </ul>
      
      <p>At INOTEBOOK, we’re here to help you simplify your task management so you can focus on achieving your goals. Whether you're managing your daily tasks or planning long-term projects, our platform is built to support you every step of the way.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  }
};

export default About;

