import {connect} from 'umi';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteTaskModal(props: any) {

  const { modalDel, setModalDel, task } = props;
  const toggleDel = () => setModalDel(!modalDel);

  function deleteButtonHandler(id: number) {
    props.deleteTask(id);
  }

  return (
    <div>

      <Modal isOpen={modalDel}>
        <ModalHeader>{task.name}</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this task?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deleteButtonHandler(task.id)}> Delete </Button>{' '}
          <Button color="secondary" onClick={toggleDel}> Cancel </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  deleteTask: (id: number) => dispatch({
    type: 'Todo/deleteAction',
    payload: {
      id: id
    }
  }),
});

export default connect(null, mapDispatchToProps) (DeleteTaskModal);
