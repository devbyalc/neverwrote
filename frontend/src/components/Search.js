const React = require('react');

class Search extends React.Component{
 constructor(props){
   super(props)

   this.state ={
     search:'',
     found:false
   }
 }

  render(){
    const getSearch = e => {
    e.preventDefault();
    //this.setState({query:this.state.search});
    console.log('searchInsideGetSearch:' + this.state.search);
    this.props.searchNote(this.state.search);
    //this.props.searchFound(this.state.notes.foundNotes, this.state.notes.found);
    console.log(this.state.foundNotes);
  }

    const updateSearch = e => {
    this.setState({search: e.target.value});
    console.log('search:' + this.state.search);
    }

  return(
      <div className="search">
      <form onSubmit = {getSearch} className ="search-form">
      <input className ="search-bar" type ="text" value={this.state.search} onChange={updateSearch}/>
      <button  className ="search-button" type="submit">Search</button>
      </form>
    </div>
  )
  }
}

module.exports = Search;