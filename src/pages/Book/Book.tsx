import { connect } from 'umi';
import book_icon from '../assets/book_icon.png';
import React from 'react';
import CreateBookModal from '@/pages/Book/CreateBookModal';

function Book(props: any) {
  const { book, authorList } = props;

  let list: any = [];
  for (let i = 0; i < book.authors.length; i++) {
    const auth = authorList.filter((el: any) => el._id === book.authors[i]);
    list.push(auth);
  }

  return (
    <div id="card" className="card text-center shadow">
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

        <div id="name">
          {list.map((el: any) =>
            el.map((e: any, index: any) => <li key={index}>{e.name}</li>),
          )}
        </div>

        <p className="card-text"> {`${book.sellingPrice} $`} </p>

        <button
          className="btn"
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
        authorList={props.authorList}
      />
    </div>
  );
}

export default connect(null, null)(Book);
