import "../App.css"

export function Square({val, chooseSquare}) {
    return (
        <div className="square" onClick={chooseSquare}>{val}</div>
    )
}