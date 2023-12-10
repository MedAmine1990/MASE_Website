import React, { Component, useState } from "react";
import { Button, Image, Card, Icon, Container, Item } from "semantic-ui-react";

const items = [
  {
    childKey: 0,
    image: "/Turn1.JPG",
    header: "Turn 1 - Braking point",
    description:
      "You are flatout down the straight at 6th gear, brake as hard as possible at the 150m board",
    extra: "Risks : understeer at entry",
  },
  {
    childKey: 1,
    image: "/Turn1-2.JPG",
    header: "Turn 1 - Corner entry",
    description:
      "When arriving at corner entry make sure to not overshoot the apex. The ideal wheel positio is on the flat kerb with a slight tire side wall touch with the sosage kerb on the inside",
    extra: "Risks : Taking too much kerb, will break your momentum",
  },
];

function SetupNotes() {
  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "10px" }}>
      <Item.Group items={items} link />
    </div>
  );
}
export default SetupNotes;
