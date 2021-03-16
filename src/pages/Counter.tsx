import { connect } from 'umi';
import { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

function Counter(props: any) {
  const { counters, counter, index } = props;
  const [newCounter, setNewCounter] = useState(counter.count);

  const [dropdownOpen, setOpen] = useState(false);
  const dropToggle = () => setOpen(!dropdownOpen);

  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);

  function updatedButtonHandler(id: number, newCounter: number) {
    props.updateCounter(id, newCounter);
    setNewCounter('');
    modalToggle();
  }

  return (
    <div className="mb-3">
      <Container className="themed-container">
        <Row xs="3">
          <Col xs="auto">
            <ButtonDropdown isOpen={dropdownOpen} toggle={dropToggle}>
              <DropdownToggle caret> </DropdownToggle>

              <DropdownMenu>
                <DropdownItem onClick={modalToggle}> Update </DropdownItem>

                <Modal isOpen={modal} toggle={modalToggle}>
                  <ModalHeader toggle={modalToggle}>
                    {' '}
                    Enter new value{' '}
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="number"
                      value={newCounter}
                      onChange={(event) => setNewCounter(event.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() =>
                        updatedButtonHandler(counter.id, Number(newCounter))
                      }
                    >
                      {' '}
                      Update{' '}
                    </Button>{' '}
                    <Button color="secondary" onClick={modalToggle}>
                      {' '}
                      Cancel{' '}
                    </Button>
                  </ModalFooter>
                </Modal>

                <DropdownItem divider />
                <DropdownItem
                  onClick={() => props.deleteButtonHandler(counter.id)}
                >
                  {' '}
                  Delete{' '}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>

          <Col xs="auto">
            <Button
              onClick={() => props.mathActionHandler(counter.id, -5)}
              style={{ background: '#00005c', borderColor: '#00005c' }}
            >
              {' '}
              -5{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, -4)}
              style={{ background: '#200393', borderColor: '#200393' }}
            >
              {' '}
              -4{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, -3)}
              style={{ background: '#4c1c70', borderColor: '#4c1c70' }}
            >
              {' '}
              -3{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, -2)}
              style={{ background: '#76354d', borderColor: '#76354d' }}
            >
              {' '}
              -2{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, -1)}
              style={{ background: '#a24f31', borderColor: '#a24f31' }}
            >
              {' '}
              -1{' '}
            </Button>
            <strong>{counter.count}</strong>
            <Button
              onClick={() => props.mathActionHandler(counter.id, 1)}
              style={{ background: '#a24f31', borderColor: '#a24f31' }}
            >
              {' '}
              +1{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, 2)}
              style={{ background: '#76354d', borderColor: '#76354d' }}
            >
              {' '}
              +2{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, 3)}
              style={{ background: '#4c1c70', borderColor: '#4c1c70' }}
            >
              {' '}
              +3{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, 4)}
              style={{ background: '#200393', borderColor: '#200393' }}
            >
              {' '}
              +4{' '}
            </Button>
            <Button
              onClick={() => props.mathActionHandler(counter.id, 5)}
              style={{ background: '#00005c', borderColor: '#00005c' }}
            >
              {' '}
              +5{' '}
            </Button>
          </Col>

          <Col xs="auto">
            {index !== counters.length - 1 && (
              <Button
                color="link"
                onClick={() => props.moveActionHandler(index, 1)}
              >
                {' '}
                ↓{' '}
              </Button>
            )}
            {index !== 0 && (
              <Button
                color="link"
                onClick={() => props.moveActionHandler(index, -1)}
              >
                {' '}
                ↑{' '}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  updateCounter: (id: number, newValue: number) =>
    dispatch({
      type: 'Count/updateAction',
      payload: {
        id: id,
        newValue: newValue,
      },
    }),
});

export default connect(null, mapDispatchToProps)(Counter);
