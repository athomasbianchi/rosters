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

// ? change players to objects lookup with fid?
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

// todo player swap action
// todo refactor and clean up

function Spot(props) {
  const {
    pos,
    selectedPlayer,
    selectedSpot,
    handleMoveClick,
    handleHereClick,
    player
  } = props;
  const posWoDigits = pos.replace(/[0-9]$/g, '');
  const possibleSlot = selectedPlayer && selectedPlayer.pos.includes(posWoDigits.toLowerCase());
  const possibleUtil = selectedPlayer && pos.toLowerCase() === 'util' && selectedPlayer.pos.some(x => UTIL.includes(x));
  const emptyBench = !player && pos === 'bench';

  // selected player is in position
  // selected player position matches bench player
  const possibleSwap = player && selectedSpot && player.pos.some(x => x === selectedSpot.toLowerCase());
  // console.log(selectedSpot, player && player.name, player && player.pos, possibleSwap);

  return (
    <div
      style={{ border: possibleSlot ? 'solid 1px green' : 'none' }}
    >
      <span>{pos}</span>
      {
        player &&
        (!selectedPlayer || selectedPlayer && selectedPlayer.fid === player.fid) &&
        <button
          style={{ backgroundColor: selectedPlayer && player && selectedPlayer.fid === player.fid ? 'blue' : 'gray' }}
          onClick={() => (handleMoveClick(player.fid))}
        >MOVE</button>
      }
      {
        (
          (emptyBench) ||
          (
            possibleSwap &&
            (!player || selectedPlayer.fid !== player.fid)            
          ) ||
          (
            (possibleSlot || possibleUtil) &&
            (!player || selectedPlayer.fid !== player.fid)
          )
        ) &&
        <button
          onClick={() => handleHereClick(pos, selectedPlayer.fid, player)}
        >HERE</button>
      }
      <Player
        player={player}
      />
    </div>
  )
}

const defaultRoster = {
  'c': null,
  '1b': null,
  '2b': null,
  '3b': null,
  'ss': null,
  'of1': null,
  'of2': null,
  'of3': null,
  'util': null,
}

export default function Team({ }) {
  const [spots, setSpots] = useState(defaultRoster);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const selectedPlayer = PLAYERS.find(x => x.fid === selectedPlayerId);
  const blankBench = selectedPlayerId && Object.values(spots).includes(selectedPlayerId);
  const selectedSpot = selectedPlayerId && Object.keys(spots).find(key => spots[key] === selectedPlayerId);
  console.log(selectedSpot);
  console.log(spots);

  const handleMoveClick = (fid) => {
    if (fid === selectedPlayerId) setSelectedPlayerId(null);
    else setSelectedPlayerId(fid);
  };

  const handleHereClick = (pos, fid, target) => {
    console.log(pos, fid, target);
    if (!target) {
      if (pos === 'bench') {
        setSpots({
          ...spots,
          [selectedSpot]: null
        })
      }
      else {
        setSpots({
          ...spots,
          [pos]: fid
        })
      }
    } else {
      console.log({[selectedSpot]: target.fid});
      if (pos === 'bench') {
        setSpots({
          ...spots,
          [selectedSpot]: target.fid,
          [pos]: fid
          // [position]: null
        });
      }
      else {
        setSpots({
          ...spots,
          [selectedSpot]: target.fid,
          [pos]: fid
        });
      }
    }
    
      setSelectedPlayerId(null);
  };

  return (
    <div>
      {
        selectedPlayer &&
        <div>
          <div>Selected Player</div>
          <div>{selectedPlayer.name} {selectedPlayer.pos}</div>
        </div>
      }
      {Object.keys(spots).map((x, i) => {
        return (
          <Spot
            key={`${x}${i}`}
            pos={x}
            selectedPlayer={selectedPlayer}
            selectedSpot={selectedSpot}
            player={PLAYERS.find(y => y.fid === spots[x])}
            handleMoveClick={handleMoveClick}
            handleHereClick={handleHereClick}
          />
        )
      })}
      {PLAYERS
        .filter(
          x => x.level === 'maj' &&
            !Object.values(spots).includes(x.fid)
        ).sort(
          (x, y) => y.contract.dollars - x.contract.dollars
        ).map((player, i) => (
          <Spot
            pos="bench"
            key={i}
            selectedPlayer={selectedPlayer}
            selectedSpot={selectedSpot}
            player={player}
            handleMoveClick={handleMoveClick}
            handleHereClick={handleHereClick}
          />
        ))}
      {
        blankBench &&
        <Spot
          pos="bench"
          selectedPlayer={selectedPlayer}
          selectedSpot={selectedSpot}
          player={null}
          handleHereClick={handleHereClick}
          handleMoveClick={handleMoveClick}
        />
      }
    </div>
  );
}

