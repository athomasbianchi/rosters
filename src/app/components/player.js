"use client"

const UTIL = ['c', '1b', '2b', '3b', 'ss', 'of', 'dh'];

export default function Player({ spot, player, handlePositionSet }) {
  const { name, pos, contract } = player;
  const { years, dollars, type } = contract;

  return (
    <div
      style={{width: '100%', display: 'flex', justifyContent: 'flex-start'}}
    >
      <div style={{ marginRight: 10}}>
        <select
          onChange={handlePositionSet}
          value={spot}
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
      </div>
      <div style={{ flexGrow: 2, display: 'flex', flexDirection: 'row'}}>

        <div>
          {name}
        </div>
          <ContractType contractType={type} />
        <div>
          {pos.map(x => (x.toUpperCase()))}
        </div>
      </div>
      <div>
        {years}
      </div>
      <div>
        {FormatDollars(dollars)}
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