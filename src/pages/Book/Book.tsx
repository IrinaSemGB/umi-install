import { connect } from 'umi';
import book_icon from '../assets/book_icon.png';
import React from 'react';
import CreateBookModal from '@/pages/Book/CreateBookModal';

function Book(props: any) {
  const { book } = props;

  return (
    <div className="card text-center shadow">
      <div className="overflow">
        <img
          src={book_icon}
          alt="book_icon"
          className="card-img-top"
          width={100}
        />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title"> {book.name} </h4>
        <p className="card-text text-success"> {`${book.sellingPrice} $`} </p>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            props.deleteBookHandler(book._id);
          }}
        >
          {' '}
          Delete{' '}
        </button>
      </div>

      <CreateBookModal
        modalAdd={props.modalAdd}
        setModalAdd={props.setModalAdd}
      />
    </div>
  );
}

export default connect(null, null)(Book);
