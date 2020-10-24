import React, { useState, useEffect } from "react";
import "../home/Cards.css";
import SingleCard from "../SigleCards";

export default function Cards() {
  const [allCards, setAllCards] = useState([]);
  const [drawCards, setDrawCards] = useState([]);
  const [remainingCardsToDraw, setRemainingCardsToDraw] = useState([]);
  const [sortedCards, setSortedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selection, setSelection] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterDirection, setFilterDirection] = useState("ascendent");

  useEffect(() => {
    let list = [];
    let suits = [
      { name: "Spades", icon: "♠︎", color: "black" },
      { name: "Hearts", icon: "♥︎", color: "red" },
      { name: "Diamonds", icon: "♦︎", color: "red" },
      { name: "Clubs", icon: "♣︎", color: "black" },
    ];
    let values = [
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "J", value: 12 },
      { label: "Q", value: 13 },
      { label: "K", value: 14 },
      { label: "A", value: 24 },
    ];
    suits.forEach((suit) => {
      values.forEach((value) => {
        list.push({
          suit: suit.name,
          label: value.label,
          value: value.value,
          icon: suit.icon,
          color: suit.color,
        });
      });
      return list;
    });
    setAllCards(list);
    setRemainingCardsToDraw(list);
  }, []);

  function shuffleCards() {
    setSelection("shuffle");
    let list = [...allCards];
    let randomList = list.sort(() => Math.random() - 0.5);
    setShuffledCards(randomList);
  }

  function drawNewCard() {
    setSelection("draw");
    let newCardsList = [...remainingCardsToDraw];
    let getRandomCard =
      newCardsList[Math.floor(Math.random() * newCardsList.length)];
    let filteredCards = newCardsList.filter((item) => item !== getRandomCard);
    setRemainingCardsToDraw(filteredCards);
    let newDrawnList = [...drawCards];
    newDrawnList.push(getRandomCard);
    setDrawCards(newDrawnList);
    setSortedCards(newDrawnList);
  }

  function sortDrawnCards(type, direction) {
    let clubs = [];
    let spades = [];
    let hearts = [];
    let diamonds = [];

    drawCards.map((card) => {
      switch (card.suit) {
        case "Clubs":
          clubs.push(card);
          break;
        case "Spades":
          spades.push(card);
          break;
        case "Hearts":
          hearts.push(card);
          break;
        case "Diamonds":
          diamonds.push(card);
          break;
      }
    });

    switch (type) {
      case "ascendent": {
        setFilterDirection(type);

        clubs.sort((a, b) => {
          return a["value"] - b["value"];
        });

        spades.sort((a, b) => {
          return a["value"] - b["value"];
        });

        hearts.sort((a, b) => {
          return a["value"] - b["value"];
        });

        diamonds.sort((a, b) => {
          return a["value"] - b["value"];
        });
        break;
      }

      case "descendent": {
        setFilterDirection(type);

        clubs.sort((a, b) => {
          return b["value"] - a["value"];
        });

        spades.sort((a, b) => {
          return b["value"] - a["value"];
        });

        hearts.sort((a, b) => {
          return b["value"] - a["value"];
        });

        diamonds.sort((a, b) => {
          return b["value"] - a["value"];
        });
        break;
      }
      case "clubs": {
        clubs.sort((a, b) => {
          if (direction === "ascendent") {
            return a["value"] - b["value"];
          } else {
            return b["value"] - a["value"];
          }
        });
        spades = [];
        hearts = [];
        diamonds = [];
        break;
      }
      case "spades": {
        spades.sort((a, b) => {
          if (direction === "ascendent") {
            return a["value"] - b["value"];
          } else {
            return b["value"] - a["value"];
          }
        });
        clubs = [];
        hearts = [];
        diamonds = [];
        break;
      }
      case "hearts": {
        hearts.sort((a, b) => {
          if (direction === "ascendent") {
            return a["value"] - b["value"];
          } else {
            return b["value"] - a["value"];
          }
        });
        clubs = [];
        spades = [];
        diamonds = [];
        break;
      }
      case "diamonds": {
        diamonds.sort((a, b) => {
          if (direction === "ascendent") {
            return a["value"] - b["value"];
          } else {
            return b["value"] - a["value"];
          }
        });
        clubs = [];
        spades = [];
        hearts = [];
        break;
      }
    }
    let ordered = [];
    if (type === "ascendent") {
      ordered = [...clubs, ...spades, ...hearts, ...diamonds];
    } else if ((type = "descendent")) {
      ordered = [...diamonds, ...hearts, ...spades, ...clubs];
    } else {
      ordered = [...clubs, ...spades, ...hearts, ...diamonds];
    }
    setSortedCards(ordered);
  }
  const cards = sortedCards.map((e, i) => <SingleCard key={i} element={e} />);

  const showShuffledCards = shuffledCards.map((e, i) => (
    <SingleCard key={i} element={e} />
  ));

  return (
    <div className="card-container">
      <h1 className="card-container-title">Tricks with cards ♥︎ ♠︎</h1>
      <div className="card-container-btn">
        <div>
          <button
            onClick={() => shuffleCards()}
            className='hp-shuffle-btn'
          >
            {selection === "shuffle"
              ? "Let me shuffle it again!"
              : "Shuffle cards"}
          </button>
        </div>
        <div>
          <button
            onClick={() => drawNewCard()}
            disabled={remainingCardsToDraw.length <= 0}
            className='hp-draw-btn'
          >
            {selection === "draw" ? "Let me draw another card!" : "Draw a card"}
          </button>
        </div>
      </div>
      {selection === "shuffle" && (
        <>
          <div className="card-container-deck">{showShuffledCards}</div>
        </>
      )}

      {selection === "draw" && (
        <>
          <p style={{ marginTop: "30px" }}>
            You have {remainingCardsToDraw.length} cards left in the deck
          </p>
          <button
            onClick={() => setShowFilters(true)}
            className='hp-sort-btn'
          >
            Sort drawn cards
          </button>
          {showFilters && (
            <>
              <button
                className="filter-type-btn"
                onClick={() => sortDrawnCards("ascendent", "ascendent")}
              >
                Ascendent
              </button>
              <button
                className="filter-type-btn"
                onClick={() => sortDrawnCards("descendent", "descendent")}
              >
                Descendent
              </button>

              {filterDirection === "ascendent" ? (
                <>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("clubs", "ascendent")}
                  >
                    <div className="filter-type-btn-icon"> ♣︎ &#8593; </div>
                  </button>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("spades", "ascendent")}
                  >
                    <div className="filter-type-btn-icon"> ♠︎ &#8593; </div>
                  </button>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("hearts", "ascendent")}
                  >
                    <div className="filter-type-btn-icon"> ♥︎ &#8593; </div>
                  </button>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("diamonds", "ascendent")}
                  >
                    <div className="filter-type-btn-icon"> ♦︎ &#8593; </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("clubs", "descendent")}
                  >
                    <div className="filter-type-btn-icon"> ♣︎ &#8595; </div>
                  </button>
                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("spades", "descendent")}
                  >
                    <div className="filter-type-btn-icon"> ♠︎ &#8595; </div>
                  </button>

                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("hearts", "descendent")}
                  >
                    <div className="filter-type-btn-icon"> ♥︎ &#8595; </div>
                  </button>

                  <button
                    className="filter-type-btn"
                    onClick={() => sortDrawnCards("diamonds", "descendent")}
                  >
                    <div className="filter-type-btn-icon"> ♦︎ &#8595; </div>
                  </button>
                </>
              )}
            </>
          )}
          <div className="card-container-deck">{cards}</div>
        </>
      )}
    </div>
  );
}
