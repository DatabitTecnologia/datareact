import React from 'react';
import Board from 'react-trello';

const data = {
  lanes: [
    {
      id: 'status1',
      title: 'Inicio de Atendimento',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Cliente1', description: 'Falar com Sidney', label: '30 mins', draggable: false },
        { id: 'Card2', title: 'Cliente2', description: 'Falar com Roger', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'status2',
      title: 'Em Atendimento',
      label: '2/2',
      cards: [
        { id: 'Card3', title: 'Cliente3', description: 'Falar com o Gate', label: '30 mins', draggable: false },
        { id: 'Card4', title: 'Cliente4', description: 'Falar com a minha mãe', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    }
  ]
};

const MyTrello = (props) => {
  return <Board data={data} style={{ height: '500px', marginTop: '10px', backgroundColor: '#04a9f5' }} />;
};

export default MyTrello;
