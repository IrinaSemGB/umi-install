import React, { useState } from 'react';
import { Popover } from 'antd';

function Author(props: any) {
  const { author, index, bookList } = props;

  const [books, setBooks] = useState<string[]>([]);

  const colorsMap = ['secondary', 'info', 'warning', 'danger'];
  function setColor(index: number) {
    let currentIndex = index;
    if (currentIndex > colorsMap.length - 1) {
      while (currentIndex >= colorsMap.length) {
        currentIndex -= colorsMap.length;
      }
    }
    return colorsMap[currentIndex];
  }

  const content = (
    <div>
      {books.map((el: string, index: number) => (
        <p key={index}>{el}</p>
      ))}
    </div>
  );
  const onVisibleChange = (isVisible: boolean) => {
    let list: string[] = [];
    if (isVisible) {
      for (let elem of author.books) {
        for (let el of bookList) {
          if (elem === el._id) {
            list.push(el.name);
          }
        }
      }
    }
    setBooks(list);
  };

  return (
    <li className={`list-group-item list-group-item-${setColor(index)}`}>
      <Popover
        content={content}
        title="Books"
        trigger="hover"
        onVisibleChange={onVisibleChange}
      >
        {author.name}
      </Popover>
    </li>
  );
}

export default Author;
