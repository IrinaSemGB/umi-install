import {connect} from 'umi';
import Task from "@/pages/TodoApp/Task";

function Column(props: any) {

  const { status, tasks } = props;

  return (
    <div className="col-sm">
      <h3>{status}</h3>
      {tasks.filter((task: any) => task.status === status).map((el: any) =>
        <Task key={el.id}
              task={el}
              modalAdd={props.modalAdd}
              setModalAdd={props.setModalAdd}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  tasks: state.Todo.tasks,
});

export default connect(mapStateToProps, null) (Column);
