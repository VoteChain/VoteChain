const Wrapper = styled.div`
table {
  border-collapse: collapse;
  max-width: 800px;
  margin: 20px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 10px;
  background-color: #333;
}
table th, table td {
  padding: 15px;
  text-align: left;
}
table th {
  background-color: #6c64ff;
  color: #fff;
}
table tr:nth-child(even) {
  background-color: #4c4c4c;
}
table tr:hover {
  background-color: #252525;
}

`;

const [checked, setChecked] = useState([1]);

function tuggle(e) {
  // console.log(checked.includes(e.target.id));
  setChecked((prev) =>
    prev.includes(e.target.id)
      ? prev.filter((i) => i !== e.target.id)
      : prev.concat(e.target.id)
  );
  // setChecked(prev => prev.concat([e.target.id]))

  // setChecked(!checked);
}

return (
  <Wrapper>
    <table>
      <thead>
        <tr>
          {props.headings.map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {JSON.stringify(props.data) === JSON.stringify([[]]) ||
        JSON.stringify(props.data) === JSON.stringify([]) ? (
          <td colSpan={props.headings.length} style={{ textAlign: "center" }}>
            No Data
          </td>
        ) : (
          props.data.map((cand) => (
            <tr key={cand[0]}>
              {cand.map((d) => (
                <td key={d}>{d}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </Wrapper>
);

// {props.select ? <th></th> : null}
// {props.select?
//     <div className="chekbox">
//         <input checked={checked.includes(cand[0])} type="checkbox" id="cbx" className="hidden-xs-up" />
//         <label onClick={tuggle} for="cbx" data-id={cand[0]} id={cand[0]} className="cbx"></label>
//     </div>
// :null}
