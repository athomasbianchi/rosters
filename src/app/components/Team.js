"use client"
import { useReducer, useState } from 'react';
import Player from './Player';

/**
 * 
 * Player : {
 *  fid: fangraphs id - string
 *  pos: [], array of strings, eligible pos
 *  name: player name - string
 *  contracts: [
 *    {
 *      years:
 *      
 *    }
 *  ]
 * }
 */

const PLAYERS = [

  {
    fid: '3473',
    pos: ['1b'],
    name: 'Anthony Rizzo',
    contract: {
      years: 1,
      dollars: 1.10,
      type: null,
    },
    slot: '1b',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '12533',
    name: 'Marcus Semien',
    pos: ['2b'],
    contract: {
      years: 1,
      dollars: 10.45,
      type: null
    },
    slot: '2b',
    level: 'maj',
    team: 'yb'
  }, {
    name: 'Ha-Seong Kim',
    fid: '27506',
    pos: ['ss', '2b', '3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    },
    slot: 'ss',
    level: 'maj',
    team: 'yb'
  }, {
    name: 'Lucas Giolito',
    fid: '15474',
    pos: ['sp'],
    contract: {
      years: 1,
      dollars: 3,
      type: 'arb1'
    },
    slot: 'sp',
    level: 'maj',
    team: 'yb'
  }, {
    name: 'Yandy Diaz',
    fid: '16578',
    pos: ['1b', '3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    },
    slot: '3b',
    level: 'maj',
    team: 'yb'
  }, {
    name: `Ke'Bryan Hayes`,
    fid: '18577',
    pos: ['3b'],
    contract: {
      years: 1,
      dollars: 1,
      type: '@'
    },
    slot: '3b',
    level: 'aaa',
    team: 'yb'
  }, {
    name: 'Nick Castellanos',
    fid: '11737',
    pos: ['of'],
    contract: {
      years: 1,
      dollars: 1.4,
      type: null
    },
    slot: 'of1',
    level: 'maj',
    team: 'yb'
  }, {
    name: 'Byron Buxton',
    fid: '14161',
    pos: ['of'],
    contract: {
      years: 1,
      dollars: 1.01,
      type: null
    },
    slot: 'of2',
    level: 'maj',
    team: 'yb'
  }, {
    name: "Brandon Nimmo",
    fid: '12927',
    pos: ['of'],
    contract: {
      years: 2,
      dollars: 1,
      type: null
    },
    slot: 'of3',
    level: 'maj',
    team: 'yb'
  }, {
    name: 'Whit Merrifield',
    fid: '11281',
    pos: ['2b', 'of'],
    contract: {
      years: 1,
      dollars: 1,
      type: null
    },
    slot: 'bench',
    level: 'maj',
    team: 'yb'
  },
  {
    fid: '17988',
    pos: ['c', 'dh'],
    name: 'Tyler Stephenson',
    contract: {
      years: 1,
      dollars: 1.35,
      type: null
    },
    slot: 'c',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '27779',
    pos: ['sp'],
    name: 'Bryce Elder',
    contract: {
      years: 1,
      dollars: 1,
      type: null
    },
    slot: 'sp',
    level: 'maj',
    team: 'yb'
  }, 
  {
    fid: '19755',
    pos: ['sp', 'dh'],
    name: 'Shohei Ohtani',
    contract: {
      years: 2,
      dollars: 19,
      type: null
    },
    slot: 'sp',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '16137',
    pos: ['sp'],
    name: 'Carlos Rodón',
    contract: {
      years: 1,
      dollars: 9.25,
      type: null
    },
    slot: 'sp',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '31838',
    pos: ['sp'],
    name: 'Kodai Senga',
    contract: {
      years: 1,
      dollars: 5.25,
      type: null
    },
    slot: 'sp',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '13649',
    pos: ['rp'],
    name: 'Clay Holmes',
    contract: {
      years: 1,
      dollars: 4,
      type: null
    },
    slot: 'rp1',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '16122',
    pos: ['rp'],
    name: 'Jordan Romano',
    contract: {
      years: 1,
      dollars: 5.75,
      type: null,
    },
    slot: 'rp2',
    level: 'maj',
    team: 'yb'
  }, {
    fid: '19853',
    pos: ['rp'],
    name: 'Michael King',
    contract: {
      years: 1,
      dollars: 1,
      type: null
    },
    slot: 'bench',
    level: 'maj',
    team: 'yb'
  },
]


const reducer = (team, action) => {

}

export default function Team({}) {
  const [state, dispatch] = useReducer(reducer, PLAYERS);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handlePositionSet = (fid) => {
    if (fid === selectedPlayerId) {
      setSelectedPlayerId(null)
    } else {
      setSelectedPlayerId(fid);
    }
  }

  // ? how to handle moving players
  // todo add bench

  const selectedPlayer = PLAYERS.find(x => x.fid === selectedPlayerId);

  return (
    <div>
      {state.filter(x => x.level === 'maj').sort(rosterSort).map(player => (
        <Player
          spot={player.slot}
          key={player.fid}
          player={player}
          handlePositionSet={handlePositionSet}
          activePos={selectedPlayer && selectedPlayer.pos}
          selectedPlayer={selectedPlayerId}
        />
      ))}
    </div>
  );
}

const lookup = {
  'c': 1,
  '1b': 2,
  '2b': 3,
  'ss': 4,
  '3b': 5,
  'of1': 6,
  'of2': 7,
  'of3': 8,
  'util': 9,
  'sp': 10,
  'rp1': 11,
  'rp2': 12,
  'bench': 13
}

function rosterSort(a,b) {
  return (lookup[a.slot]-lookup[b.slot]);
}