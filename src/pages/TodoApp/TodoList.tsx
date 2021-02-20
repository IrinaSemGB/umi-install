import { connect } from 'umi';
import React, {useState} from 'react';
import Column from "@/pages/TodoApp/Column";

function TodoList(props: any) {

  const { statuses } = props;
  const [modalAdd, setModalAdd] = useState(false);
  const toggleAdd = () => setModalAdd(!modalAdd);

  return (
    <div>

      <div className="container">
        <h1>Kanban Board</h1>
        <button onClick={toggleAdd} type="button" className="btn btn-success btn-sm"> Create New Task </button>
        <hr/>

        <div className="row">
          {statuses.map((el: any, index: any) =>
            <Column key={index}
                    status={el}
                    modalAdd={modalAdd}
                    setModalAdd={setModalAdd}
            />)
          }
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state: any) => ({
  statuses: state.Todo.statuses,
});

export default connect(mapStateToProps, null) (TodoList);
