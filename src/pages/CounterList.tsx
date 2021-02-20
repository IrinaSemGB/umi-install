import { connect } from 'umi';
import Counter from "@/pages/Counter";
import {useState} from "react";



function CounterList(props: any) {

  const { counters } = props;
  const [addCounter, setAddCounter] = useState('');

  const mathActionHandler = (id: number, value: number) => {
    props.mathAction(id, value);
  };

  const deleteButtonHandler = (id: number) => {
    props.deleteCounter(id);
  };

  const moveActionHandler = (i: number, direction: number) => {
    props.moveAction(i, direction);
  };

  const addCounterHandler = (id: number, count: number) => {
    props.addNewCounter(id, count);
    setAddCounter('');
  };

  return (
    <div className='container'>
      <nav className="navbar bg-light">
        <h1> Counter </h1>
      </nav>

      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={() => addCounterHandler(Math.random(), Number(addCounter))}>
          Add new counter
        </button>
        <input type="number"
               className="form-control form-control-sm"
               aria-label=".form-control-sm example"
               value={addCounter}
               onChange={event => setAddCounter(event.target.value)}/>
        <hr/>
      </div>

      {counters.map((el: any, index: any) => <Counter key={el.id}
        counter={el}
        index={index}
        counters={counters}
        mathActionHandler={mathActionHandler}
        deleteButtonHandler={deleteButtonHandler}
        moveActionHandler={moveActionHandler}
      />)}

    </div>
  );
}

const mapStateToProps = (state: any) => ({
  counters: state.Count.counters,
});


const mapDispatchToProps = (dispatch: any) => ({

  mathAction: (id: number, value: number) => dispatch({
    type: 'Count/mathAction',
    payload: {
      id: id,
      value: value
    }
  }),

  deleteCounter: (id: number) => dispatch({
    type: 'Count/deleteAction',
    payload: {
      id: id
    }
  }),

  moveAction: (index: number, direction: number) => dispatch({
    type: 'Count/moveAction',
    payload: {
      index: index,
      direction: direction
    }
  }),

  addNewCounter: (id: number, count: number) => dispatch({
    type: 'Count/addAction',
    payload: {
      id: id,
      count: count
    }
  })
})


export default connect(mapStateToProps, mapDispatchToProps) (CounterList);
