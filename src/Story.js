/**
 * @file
 * Container for all the story text
 */

import React from "react";

const Story = ({ sceneText }) => (
  <section className="story-text">
    {sceneText.map((text, idx) => <p key={idx}>{text}</p>)}
  </section>
);

export default Story;
