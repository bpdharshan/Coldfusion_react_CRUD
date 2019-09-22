import React from 'react';

export default class Table extends React.Component{
    render(){
        let list = this.props.details.map(p =>{
            return (
                <tr key={p[0]}>
                    {Object.keys(p).filter(k => k !== 'id').map(k => {
                        return (
                            <td key={p.id+''+k}>
                                    {p[k]}
                            </td>
                        );
                    })}
                    <td key={p[0]}><button type="button" className="btn btn-danger float-right" onClick={(e) => this.props.update(p[0],p[1],p[2])}  name="submit" id="submit">Edit</button>
                    <button type="button" className="btn btn-default float-right" onClick={(e) => this.props.delete(p[0])} name="submit" id="submit">Delete</button></td>
                </tr>
            );
        });
        return(
            <table className="table table-borderless">
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }
}