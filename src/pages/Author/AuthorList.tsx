import { connect } from 'umi';
import React, { useEffect, useState } from 'react';
import { Button, Input, InputGroup } from 'reactstrap';
import Author from '@/pages/Author/Author';

export interface IAuthor {
  name: string;
  books: any;
}

function AuthorList(props: any) {
  useEffect(() => {
    props.getAuthors();
    props.getBooks();
  }, []);

  const { authorList = [], bookList = [] } = props;

  const [name, setName] = useState('');

  let books: any = [];

  function createAuthorHandler() {
    const newAuthor: IAuthor = {
      name: name,
      books: books,
    };
    props.create(newAuthor);
  }

  return (
    <div className="container">
      <div>
        <strong id="authorTitle"> Authors </strong>
        <a href="http://localhost:8000/book" id="toBooksLink">
          {' >> back to books'}
        </a>
      </div>

      <InputGroup>
        <Input
          placeholder="please, enter author name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
        <Button type="button" className="btn" onClick={createAuthorHandler}>
          {' '}
          Create new{' '}
        </Button>
      </InputGroup>
      <hr />

      {authorList
        .sort(function (a: any, b: any) {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          return nameA < nameB ? -1 : 1;
        })
        .map((author: any, index: any) => (
          <ul className="list-group" key={author._id}>
            <Author author={author} index={index} bookList={bookList} />
          </ul>
        ))}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  authorList: state.Author.authorList,
  bookList: state.Book.bookList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAuthors: () =>
    dispatch({
      type: 'Author/getAuthors',
      payload: {},
    }),

  create: (newAuthor: any) =>
    dispatch({
      type: 'Author/create',
      payload: {
        newAuthor: newAuthor,
      },
    }),

  getBooks: () =>
    dispatch({
      type: 'Book/getBooks',
      payload: {},
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);
