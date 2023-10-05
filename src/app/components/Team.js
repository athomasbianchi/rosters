"use client"
import { useReducer } from 'react';
import Player from './Player';

const PLAYERS = [
  {
    fid: '17988',
    pos: ['c', 'dh'],
    name: 'Tyler Stephenson',
    contract: {
      years: 1,
      dollars: 1.35,
      type: null
    },
  }, {
    fid: '3473',
    pos: ['1b'],
    name: 'Anthony Rizzo',
    contract: {
      years: 1,
      dollars: 1.10,
      type: null,
    },
  }, {
    fid: '12533',
    name: 'Marcus Semien',
    pos: ['2b'],
    contract: {
      years: 1,
      dollars: 10.45,
      type: null
    },
  }, {
    name: 'Ha-Seong Kim',
    fid: '27506',
    pos: ['ss', '2b', '3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    }
  }, {
    name: 'Lucas Giolito',
    fid: '15474',
    pos: ['sp'],
    contract: {
      years: 1,
      dollars: 3,
      type: 'arb1'
    }
  }, {
    name: 'Yandy Diaz',
    fid: '16578',
    pos: ['1b', '3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    }
  }, {
    name: `Ke'Bryan Hayes`,
    fid: '18577',
    pos: ['3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: '@'
    }
  }, {
    name: 'Nick Castellanos',
    fid: '11737',
    pos: ['of'],
    contract: {
      years: 1,
      dollars: 1.4,
      type: null
    }
  }, {
    name: 'Byron Buxton',
    fid: '14161',
    pos: ['of'],
    contract: {
      years: 1,
      dollars: 1.01,
      type: null
    }
  }, {
    name: "Brandon Nimmo",
    fid: '12927',
    pos: ['of'],
    contract: {
      years: 2,
      dollars: 1,
      type: null
    }
  }, {
    name: 'Whit Merrifield',
    fid: '11281',
    pos: ['2b', 'of'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    }
  }

]

const initialState = {
  'c': '17988',
  '1b': null,
  '2b': null,
  'ss': null,
  '3b': null,
  'of1': null,
  'of2': null,
  'of3': null,
  'util': null,
  'sp': [],
  'rp1': null,
  'rp2': null
}

const reducer = (team, action) => {

}

export default function Team({}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePositionSet = (e) => {
    console.log(e.target);
    const pos = e.target.value;
    // dispatch({
    //   pos,

    // })
  }

  return (
    <div>
      {state['c'] && (
        <Player
          spot='c'
          player={PLAYERS.find(x => x.fid === state['c'])}
          handlePositionSet={handlePositionSet}
        />
      )}
      {PLAYERS.map(player => (
        <Player
          spot="bench"
          key={player.fid}
          player={player}
          handlePositionSet={handlePositionSet}
        />
      ))}
    </div>
  );
}