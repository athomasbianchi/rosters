import Player from './components/player'

const TEAM = [
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
  }

]

export default function Home() {
  return (
    <main>
      {/* <Player 
        player={{
          pos: ['OF', 'DH'],
          name: 'Mike Trout',
          contract: {
            years: 1,
            dollars: 25.00,
            type: null
          }
        }}
        spot="OF"
      /> */}
      {TEAM.map((player, i) => {
        return (<Player 
          key={i}
          player={{
            pos: player.pos,
            name: player.name,
            contract: player.contract
          }}
        />)
      })}

    </main>
  )
}
