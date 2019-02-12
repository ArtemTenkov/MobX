import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { observer, inject, } from 'mobx-react';
import {autorun } from 'mobx';

window.React = React;

@inject('statsStore', 'uiStore')
@observer
export default class Paginator extends Component {  

  componentDidMount() {
    const { statsStore, uiStore } = this.props;
    statsStore.loadStatsWithPaging(uiStore.perPage, 0);

    const dataUploadReaction =  autorun(() => {
      if(statsStore.statUnits.length > 0)
        uiStore.setState({pageCount: Math.ceil(statsStore.totalCount / statsStore.limit)});  
    });
}

  handlePageClick = (data) => {
    const { uiStore, statsStore } = this.props;

    let selected = data.selected;
    let offset = Math.ceil(selected * uiStore.perPage);    

    uiStore.setState({offset: offset});
    statsStore.loadStatsWithPaging(uiStore.perPage, offset);
  };

  showLoader(){    
    return this.props.statsStore.loading?  <div id="overlay" style={{zIndex:'99'}}><img id="loading"  src="/images/loading.gif" /></div>: '';
  }

  showPaginator(){
    const { uiStore } = this.props;

    return this.props.statsStore.statUnits.length > 0?  
    <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={uiStore.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />: <div></div>;
  }

  render() {

    return (
      <div>        
          {this.showLoader()}
          {this.showPaginator()}
      </div>
    );
  }
};