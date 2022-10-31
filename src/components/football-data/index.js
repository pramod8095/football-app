
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      records:[]
    };
  }

  getData = async() =>{
    const data = await fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${this.state.selectedYear}`);
    const resp = await data.json();
    if(resp){
      this.setState({
        records: resp
      })
    }
    
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    console.log(year)
    this.setState({
      selectedYear: year
    },()=>{
      this.getData();
    })
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const {records} = this.state;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          <section>
          { records && records.data && records.data.length > 0 && <div className="total-matches" data-testid="total-matches">Total matches: {records.data.length}</div>}
          { records && records.data && records.data.length > 0 && <ul className="mr-20 matches styled" data-testid="match-list">
             
              { records && records.data && records.data.length > 0 && 
                (records.data.map((item, index) => {
                return(<li className="slide-up-fade-in" key={index}> Match {item.name} won by {item.winner}</li>);
              }) ) }
            </ul>}
          </section>

          { (records && records.data && records.data.length === 0) ? <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div> : null}
        </section>
      </div>
    );
  }
}