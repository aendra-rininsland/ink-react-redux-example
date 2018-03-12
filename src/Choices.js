/**
 * @file
 * Container component for player choices
 */

import React from "react";

const Choices = ({ choices, makeChoice }) => (
  <section className="choices">
    <h3>Make a decision...</h3>
    <ul>
      {choices.map(choice => (
        <li key={choice.index} onClick={() => makeChoice(choice.index)}>
          {choice.text}
        </li>
      ))}
    </ul>
  </section>
);

export default Choices;
