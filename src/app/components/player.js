"use client"
import { useState } from "react";

const UTIL = ['c', '1b', '2b', '3b', 'ss', 'of', 'dh'];

export default function Player({ spot, player }) {
  const { name, pos, contract } = player;
  const { years, dollars, type } = contract;

  const [activePos, setActivePos] = useState(pos[0])

  const handlePositionSet = (e) => {
    setActivePos(e.target.value);
  }

  return (
    <div>
      <select
        onChange={handlePositionSet}
        value={activePos}
      >
        {pos.map(x => {
          if (x.toLowerCase() !== 'dh') {
            return (
            <option key={x} value={x}>
              {x.toUpperCase()}
            </option>
            )
          }
        })}
        {pos.some(x => UTIL.includes(x.toLowerCase())) ?
          <option value="util">Util</option> : ''
        }
        <option value="bench">Bench</option>
      </select>
      <span>
        {" "}{name}
      </span>
        <ContractType contractType={type} />
      <span>
        {" "}{pos}
      </span>
      <span>
        {years}
      </span>
      {FormatDollars(dollars)}
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