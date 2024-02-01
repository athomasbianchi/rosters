"use client"
import { useReducer, useState } from 'react';
import Player from './Player';

const UTIL = ['c', '1b', '2b', '3b', 'ss', 'of', 'dh'];

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

// todo change players to objects lookup with fid?
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
    level: 'maj',
    team: 'yb'
  },
]

// todo handle here click to place player in 1b roster spot
// todo extrapolate spot from 1b to all positions

function Spot(props) {
  const {
    pos,
    selectedPlayer,
    handleMoveClick,
    handleHereClick,
    player
  } = props;
  const possibleSlot = selectedPlayer && selectedPlayer.pos.includes(pos.toLowerCase());

  return (
    <div
      style={{ border: possibleSlot ? 'solid 1px green' : 'none'}}
    >
      <span>{pos}</span>
      { player &&
        <button
          style={{ backgroundColor: selectedPlayer && player && selectedPlayer.fid === player.fid ? 'blue' : 'gray'}}
          onClick={() => (handleMoveClick(player.fid))}
        >MOVE</button>
      }
      {
        possibleSlot && (!player || selectedPlayer.fid !== player.fid) && 
        <button
          onClick={() => handleHereClick(pos, selectedPlayer.fid)}
        >HERE</button>
      }
      <Player
        player={player}
      />
    </div>
  )
}

export default function Team({ }) {
  const [firstBaseId, setFirstBaseId] = useState(null)
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const selectedPlayer = PLAYERS.find(x => x.fid === selectedPlayerId);
  const firstBaseman = PLAYERS.find(x => x.fid === firstBaseId);

  const handleMoveClick = (fid) => {
    console.log(fid)
    if (fid === selectedPlayerId) setSelectedPlayerId(null);
    else setSelectedPlayerId(fid);
  }

  const handleHereClick = (pos, fid) => {
    console.log(pos);
    console.log(fid);
    setFirstBaseId(fid);
    setSelectedPlayerId(null);
  }

  return (
    <div>
      {selectedPlayer && selectedPlayer.name}
      {selectedPlayer && selectedPlayer.pos}
      <Spot
        pos='1b'
        selectedPlayer={selectedPlayer}
        player={firstBaseman}
        handleMoveClick={handleMoveClick}
        handleHereClick={handleHereClick}
      />
      {PLAYERS
        .filter(
          x => x.level === 'maj'
        ).sort(
          (x, y) => y.contract.dollars - x.contract.dollars
        ).map((player, i) => (
          <Spot
            pos="bench"
            key={i}
            selectedPlayer={selectedPlayer}
            player={player}
            handleMoveClick={handleMoveClick}
            handleHereClick={handleHereClick}
          />
        ))}
    </div>
  );
}

const starters = {
  'c': 1,
  '1b': 1,
  '2b': 1,
  'ss': 1,
  '3b': 1,
  'of': 3,
  'util': 1,
  'rp': 2,
}
