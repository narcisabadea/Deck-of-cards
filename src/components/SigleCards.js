import React from "react";
import "./home/SingleCard.css";

export default function SingleCard(props) {
  
  const suitPositions = [
    [
      [0, 0]
    ],
    [
      [0, -1],
      [0, 1, true]
    ],
    [
      [0, -1],
      [0, 0],
      [0, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -0.5],
      [-1, 0], [1, 0],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -0.5],
      [-1, 0], [1, 0],
      [0, 0.5, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [-1, -1 / 3], [1, -1 / 3],
      [0, 0],
      [-1, 1 / 3, true], [1, 1 / 3, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [-1, -1], [1, -1],
      [0, -2 / 3],
      [-1, -1 / 3], [1, -1 / 3],
      [-1, 1 / 3, true], [1, 1 / 3, true],
      [0, 2 / 3, true],
      [-1, 1, true], [1, 1, true]
    ],
    [
      [0, 0]
    ],
    [
      [0, 0]
    ],
    [
      [0, 0]
    ]
  ];

  const createSuit = (suit) => (pos) => {
    const [ x, y, mirrored ] = pos;
    const mirroredClass = mirrored ? ' mirrored' : '';
    return (
      <div className={`card-suit ${mirroredClass}` } style={{left: `${x * 100}%`, top: `${y * 100}%`}}>
        {suit}
      </div>
    )
  };
  
  return (
    <div className="card">
      <div className="card-suits" style={{color: props.element.color}}>
      {suitPositions[(props.element.value-1) % 13].map(createSuit(props.element.icon))}
      </div>
        <div className="card-top-left">
          <div className="card-corner-label" style={{color: props.element.color}}>{props.element.label}</div>

          <div className="card-corner-suit" style={{color: props.element.color}}>{props.element.icon}</div>
        </div>

      <div className="card-bottom-right" style={{color: props.element.color}}>
        <div className="card-corner-label">{props.element.label}</div>

        <div className="card-corner-suit">{props.element.icon}</div>
      </div>
    </div>

    
  );
}
