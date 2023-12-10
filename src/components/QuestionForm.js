import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      if (name === "correctIndex") {
        return {
          ...prevFormData,
          correctIndex: parseInt(value, 10),
        };
      } else if (name.startsWith("answer")) {
        const index = parseInt(name.replace("answer", ""), 10);
        const newAnswers = [...prevFormData.answers];
        newAnswers[index] = value;
        return {
          ...prevFormData,
          answers: newAnswers,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Send POST request to create a new question
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("New question created:", data))
      .catch((error) => console.error("Error creating question:", error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answer${index}`}
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <p>
          Selected Answer: {formData.answers[formData.correctIndex]}
        </p>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
