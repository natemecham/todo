import React from 'react';
import { Link } from 'react-router-dom';

class ToDoListItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isComplete && nextProps.isComplete) {
      window.requestAnimationFrame(() => {
        this.label.classList.add("flip");
      });
    } else if (this.props.isComplete && !nextProps.isComplete) {
      window.requestAnimationFrame(() => {
        this.label.classList.remove("flip");
      });
    }
  }

  handleDropDown = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {isComplete, id, onChange, text, isMenuOpen, onDelete, flip} = this.props;
    const isCompleteClass = isComplete ? 'complete' : 'incomplete';
    const isMenuOpenClass = this.state.open ? 'open' : 'closed';

    return(
      <li className={ isCompleteClass + ' todo_item'}>
        <input type="checkbox" checked={isComplete} value={id} id={"list_"+id} onChange={onChange}/>
        <label ref={(c) => { this.label = c; }} htmlFor={"list_"+id}>
          {text}
        </label>
        <div className={isMenuOpenClass + ' drop_down'}>
          <button className="toggle_drop" onClick={this.handleDropDown}></button>
          <div className="menu">
            <Link className="btn" to={`/task/${id}`}>See Details</Link>
            <button onClick={onDelete} className="delete btn">Delete</button>
          </div>
        </div>
      </li>
    );
  }
}

export default ToDoListItem;
