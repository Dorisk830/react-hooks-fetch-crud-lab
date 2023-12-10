import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    // Send DELETE request to remove the question on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id); // Update the client-side state
        } else {
          console.error("Error deleting question on server");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);

    // Send PATCH request to update correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => {
        if (response.ok) {
          onUpdateCorrectIndex(id, newCorrectIndex); // Update the client-side state
        } else {
          console.error("Error updating correct index on server");
        }
      })
      .catch((error) => console.error("Error updating correct index:", error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={handleCorrectIndexChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
