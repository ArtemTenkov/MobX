import {observable, useStrict , runInAction,  action} from "mobx";

useStrict({ enforceActions: 'observed' })

export class UIStore {
    @observable offset;
    @observable selected = 0;
    @observable perPage = 10;
    @observable pageCount;

    @action
    setState(state){
        if(state.offset)
        this.offset = state.offset;

        if(state.selected)
        this.selected = state.selected;

        if(state.pageCount)
        this.pageCount = state.pageCount;
    }
}