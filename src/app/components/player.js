"use client"

const UTIL = ['c', '1b', '2b', '3b', 'ss', 'of', 'dh'];

export default function Player({ spot, player, handlePositionSet, activePos }) {
  const { name, pos, contract, fid } = player;
  const { years, dollars, type } = contract;

  const handleClick = (fid) => {
    handlePositionSet(fid)
  }

  return (
    <div
      style={{display: 'flex', backgroundColor: activePos && activePos.includes(spot) ? 'red' : 'white'}}
    >
      {/* Roster Info */}
      <div>{spot}</div>
      <div>
        {name}
      </div>
      <div>
        {pos.filter(x => x !== "dh").map(x => (x.toUpperCase()))}
      </div>
      <div>
        <button
          onClick={() =>handleClick(fid)}
        >Move</button>
      </div>
      {/* Contract Info */}
      <div>
        {years}
      </div>
      <div>
        {FormatDollars(dollars)}
      </div>
      <div>
        {type}
      </div>
    </div>
  );
}

const usd = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const FormatDollars = (dollars) => {
  return <span>{usd.format(dollars)}</span>
}