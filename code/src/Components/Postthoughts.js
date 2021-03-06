import React, { useState } from 'react';

import 'styles/postthoughts.css';

export const Postthoughts = ({ id }) => {
  const MESSAGES_URL = "https://happythoughts-only.herokuapp.com/thoughts";
  const [addThought, setAddThought] = useState("");
  const [name, addName] = useState("Anonymous");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Sends a POST request using the 'addThought' state
    fetch(MESSAGES_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: addThought, name: name })
      }
      // And then reload the window so we see the new thought that was added
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <form className="post-box" onSubmit={handleSubmit} >
      <label htmlFor={id}>What's making you happy right now?</label>
      <textarea
        className="thought-input"
        id={id}
        type="text"
        rows="3"
        value={addThought}
        onChange={event => setAddThought(event.target.value)}
      />
      <label htmlFor={id}>Your name? (optional)
      <input
          className="name-input"
          id={id}
          type="text"
          value={name}
          onChange={event => addName(event.target.value)}
        />
      </label>
      <div className="button-footer">
        <button
          type="submit"
          className="send-thought"
          disabled={addThought.length < 6 || addThought.length > 140}
        >
          <span role="img" aria-label="Red heart emoji">&#10084;&#65039; </span>
          Send Happy Thought
          <span role="img" aria-label="Red heart emoji"> &#10084;&#65039;</span>
        </button>
        <p className="counter" tabIndex="0">
          <span
            style={{ color: addThought.length > 140 ? "#e60707" : "#000" }}
            tabIndex="0">
            {addThought.length}
          </span>
          /140
        </p>
      </div>
    </form>
  );
};