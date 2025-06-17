import React, { useState } from 'react';

const CustomLane = ({ lane }) => {
  const [showAllCards, setShowAllCards] = useState(false);
  const cardsToShow = showAllCards ? lane.cards : lane.cards.slice(0, 3); // Mostra 3 cards por padrão

  return (
    <div className="lane">
      <h2>{lane.title}</h2>
      {cardsToShow.map((card) => (
        <div key={card.id} className="card">
          {card.title}
        </div>
      ))}
      {lane.cards.length > 3 && (
        <button onClick={() => setShowAllCards(!showAllCards)}>{showAllCards ? 'Mostrar Menos' : 'Mostrar Mais'}</button>
      )}
    </div>
  );
};

export default CustomLane;
