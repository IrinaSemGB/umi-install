import {connect} from 'umi';
import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Badge } from 'reactstrap';

function CreateTaskModal(props: any) {

  const { modalAdd, setModalAdd } = props;
  const toggleAdd = () => setModalAdd(!modalAdd);

  const initialNewTask = {
    id: Math.random(),
    name: 'Specify the name of the task',
    description: 'Add task description',
    status: props.statuses[0],
    priority: 3,
  };

  const [name, setName] = useState(initialNewTask.name);
  const [description, setDescription] = useState(initialNewTask.description);
  const [priority, setPriority] = useState(initialNewTask.priority);
  const [status, setStatus] = useState(initialNewTask.status);

  function createTaskHandler() {
    const newTask = {id: Math.random(), name: name, description: description, status: status, priority: priority};
    props.createTask(newTask);
    toggleAdd();
  }

  return (
    <div>
      <Modal isOpen={modalAdd}>
        <ModalHeader> Add New Task </ModalHeader>
        <ModalBody>

          <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Name </Badge></h4></label>
          <input value={name}
                 onChange={(event) => setName(event.target.value)}
                 className="form-control"
                 type="text"/>

          <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Description </Badge></h4></label>
          <input value={description}
                 onChange={(event) => setDescription(event.target.value)}
                 className="form-control"
                 type="text"/>

          <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Status </Badge></h4></label>
          <select value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="form-control">
            {props.statuses.map((el: any, index: any) => <option key={index} value={el}> {el} </option>)}
          </select>

          <label htmlFor="exampleFormControlSelect2"><h4><Badge color="link"> Priority </Badge></h4></label>
          <select value={priority}
                  onChange={(event) => setPriority(Number(event.target.value))}
                  className="form-control">
            {props.priorities.map((el: any, index: any) => <option key={index}>{el}</option>)}
          </select>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createTaskHandler}> Create </Button>{' '}
          <Button color="secondary" onClick={toggleAdd}> Cancel </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  statuses: state.Todo.statuses,
  priorities: state.Todo.priorities
});

const mapDispatchToProps = (dispatch: any) => ({
  createTask: (newTask: any) => dispatch({
    type: 'Todo/createAction',
    payload: {
      newTask: newTask
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps) (CreateTaskModal);
