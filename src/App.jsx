import React from 'react';
import Images from './images';
import {useState, useEffect} from "react";
import {shuffle} from 'lodash';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

function App() {
    const [cards,setCards] = useState( shuffle([...Images, ...Images]) );
    const [clicks,setClicks] = useState(0);
    const [won,setWon] = useState(false);
    const [activeCards,setActiveCards] = useState([]);
    const [foundPairs,setFoundPairs] = useState([]);
    const [count, setCount] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState();
   
    useEffect(() => {
      setInterval(() => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount));
        // setCount(prevCount => (prevCount - 20))
      }, 1000);
    }, []);

    function startOver() {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
      setCount(100);
      setActiveCards([]);
    }

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    function flipCard(index) {
      if (won) {
        setCards(shuffle([...Images, ...Images]));
        setFoundPairs([]);
        setWon(false);
        setClicks(0);
        setCount(100);
        showModal();
      }
    
      if (activeCards.length === 0) {
        setActiveCards([index]);
      }
      if (activeCards.length === 1) {
        const firstIndex = activeCards[0];
        const secondsIndex = index;
        if (cards[firstIndex] === cards[secondsIndex]) {
          if (foundPairs.length + 2 === cards.length) {
            setWon(true);
          }
          setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
        }
        setActiveCards([...activeCards, index]);
      }
      if (activeCards.length === 2) {
        setActiveCards([index]);
      }
      if(!won) {
        setClicks(clicks + 1);
      }
    }
    return (
      <div>
        <Modal className='modalMessage' title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        <div className="board">
          {cards.map((card,index) => {
            const flippedToFront =  (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
            return (
              <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                   onClick={() => flipCard(index)}>
                <div className="card">
                  <div className="front">
                    <img src={card} alt=""/>
                  </div>
                  <div className="back" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="stats">
          {won && (
            <>You won the game! Congratulations!
              <br /><br />
            </>
          )}
          {count==0 && (
            <>Time ran out! You lost the game!
            <br /><br />
          </>
          )}
          Clicks: {clicks} &nbsp;&nbsp;&nbsp;
          Found pairs:{foundPairs.length/2}
          <br />
          Timer: {count}
          <br />
          <button onClick={startOver}>
          Start Over
          </button>
          <Button type="primary" onClick={showModal}>
          Open Modal
          </Button>
        </div>
      </div>
    );
  }
  
  export default App;