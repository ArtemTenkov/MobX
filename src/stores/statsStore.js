import {observable, useStrict , runInAction,  action} from "mobx";

useStrict({ enforceActions: 'observed' })

class StatUnit{
    constructor(warehouseId, date, hour, orderLinesPicked, unitsPicked, unitsBackordered){
        this.warehouseId = warehouseId;
        this.date = date;
        this.hour = hour;
        this.orderLinesPicked = orderLinesPicked;
        this.unitsPicked = unitsPicked;
        this.unitsBackordered = unitsBackordered;
    }
    @observable warehouseId;
    @observable date;
    @observable hour;
    @observable orderLinesPicked;
    @observable unitsPicked;
    @observable unitsBackordered;
}

export class StatsStore {
    @observable statUnits = [];
    @observable totalCount;
    @observable limit = 10;
    @observable loading = false;
    constructor(){
       
    }

    requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

    @action async loadStatsWithPaging(perPage, offset){
        this.loading = true;

        var result =  await fetch(`Stats.aspx/GetStatsWithPaging`, 
        { 
            headers: this.requestHeaders, 
            method:'POST',
            body: JSON.stringify({offset: offset, perPage: perPage})},
        );
      var statsResponse = await result.json();
        runInAction(() => {            
            this.loading = false;

            if(statsResponse.d.length < 1) return;

            this.statUnits = [];
            this.totalCount = statsResponse.d[0].TotalCount;

            statsResponse.d.map(stat => {                
                this.statUnits.push(new StatUnit(stat.WarehouseId, stat.Date, stat.Hour, stat.OrderlinesPicked, stat.UnitsPicked, stat.UnitsBackordered))   
            });
        });
    }
}

