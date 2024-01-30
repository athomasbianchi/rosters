"use client"

export default function Player({ player }) {
  if (!player) return ("")
  const { name, pos, contract, fid } = player;
  const { years, dollars, type } = contract;


  return (
    <div
      style={{
        display: "inline-flex",
        backgroundColor: 'red'
      }}
    >
      {/* Roster Info */}
      <div>
        {name}
      </div>
      <div>
        {pos.filter(x => x !== "dh").map(x => (x.toUpperCase()))}
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