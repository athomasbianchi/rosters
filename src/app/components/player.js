"use client"

const UTIL = ['c', '1b', '2b', '3b', 'ss', 'of', 'dh'];

export default function Player({ spot, player, handlePositionSet }) {
  const { name, pos, contract } = player;
  const { years, dollars, type } = contract;

  return (
    <div
      style={{display: 'flex'}}
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
        <button>Move</button>
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
        {/* <ContractType contractType={type} /> */}
      </div>
    </div>
  );
}

const ContractType = ({ contractType}) => {
  if (!contractType) return "";
  if (contractType.indexOf('arb') === 0) {
    return <span><sup>{contractType[3]}</sup></span>

  }
  if (contractType === "@") {
    return (<span><sup>@</sup></span>)
  }

  return "";
}

const usd = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const FormatDollars = (dollars) => {
  return <span>{usd.format(dollars)}</span>
}