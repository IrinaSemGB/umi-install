import { connect } from 'umi';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface IBook {
  name: string;
  authors: any;
  purchasePrice: number;
  sellingPrice: number;
}

function CreateBookModal(props: any) {
  const { modalAdd, setModalAdd } = props;
  const toggleAdd = () => setModalAdd(!modalAdd);

  const [name, setName] = useState('Not assigned');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);

  function createBookHandler() {
    const newBook: IBook = {
      name: name,
      authors: [],
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
    };
    props.create(newBook);
    toggleAdd();
  }

  return (
    <div>
      <Modal isOpen={modalAdd}>
        <ModalHeader> Add New Book </ModalHeader>

        <ModalBody>
          <label htmlFor="exampleFormControlSelect2">
            <h6> Name </h6>
          </label>
          <input
            value={name}
            placeholder="enter the name of the book"
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            type="text"
          />

          <label htmlFor="exampleFormControlSelect2">
            <h6> Purchase price </h6>
          </label>
          <input
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(Number(event.target.value))}
            className="form-control"
            type="text"
          />

          <label htmlFor="exampleFormControlSelect2">
            <h6> Selling price </h6>
          </label>
          <input
            value={sellingPrice}
            onChange={(event) => setSellingPrice(Number(event.target.value))}
            className="form-control"
            type="text"
          />
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={createBookHandler}>
            {' '}
            + Add{' '}
          </Button>{' '}
          <Button color="secondary" onClick={toggleAdd}>
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  create: (newBook: any) =>
    dispatch({
      type: 'Book/create',
      payload: {
        newBook: newBook,
      },
    }),
});

export default connect(null, mapDispatchToProps)(CreateBookModal);
