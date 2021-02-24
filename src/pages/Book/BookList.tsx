import { connect } from 'umi';
import React, { useEffect, useState } from 'react';
import Book from '@/pages/Book/Book';
import './cardStyle.css';

function BookList(props: any) {
  const { bookList = [] } = props;

  const [modalAdd, setModalAdd] = useState(false);
  const toggleAdd = () => setModalAdd(!modalAdd);

  useEffect(() => {
    props.getBooks();
  }, []);

  const deleteBookHandler = (id: string) => {
    props.deleteBook(id);
  };

  return (
    <div className="container">
      <h1> Books </h1>
      <button
        onClick={toggleAdd}
        type="button"
        className="btn btn-success btn-sm"
      >
        {' '}
        Create New Book{' '}
      </button>
      <hr />

      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          {bookList.map((el: any) => (
            <div className="col-sm-4" key={el._id}>
              <Book
                book={el}
                deleteBookHandler={deleteBookHandler}
                modalAdd={modalAdd}
                setModalAdd={setModalAdd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  bookList: state.Book.bookList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getBooks: () =>
    dispatch({
      type: 'Book/getBooks',
      payload: {},
    }),
  deleteBook: (id: string) =>
    dispatch({
      type: 'Book/deleteBook',
      payload: {
        _id: id,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);