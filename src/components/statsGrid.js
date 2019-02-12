import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

@inject('statsStore')
@observer
export default class StatsGrid extends React.Component {

    @computed get stats() {
        return this.props.statsStore.statUnits;
    }

    render() {

        return (
            this.stats.length < 1 ?
                <h1></h1>
                :
                <div className="table-stats">
                            	<table className="table table-bordered table-responsive">
                                <thead>
  									<tr className="backgroundColor">
                                    	<th>WarehouseId</th>
                                        <th>Date</th>
                                        <th>Hour</th>
                                        <th>Orderlines picked</th>
                                        <th>UnitsPicked</th>
                                        <th>UnitsBackordered</th>                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.stats.map(unit => {
                                        return (<tr key={Math.floor((Math.random() * 10000) + 1).toString() +  Math.floor((Math.random() * 10000) + 1).toString()}>	
                                            <td>{unit.warehouseId}</td>
                                            <td>{unit.date}</td>
                                            <td>{unit.hour}</td>
                                            <td>{unit.orderLinesPicked}</td>
                                            <td>{unit.unitsPicked}</td>
                                            <td>{unit.unitsBackordered}</td>
                                            </tr>);
                                    })}
                                    </tbody>
								</table>
                            </div>                );
    }
}