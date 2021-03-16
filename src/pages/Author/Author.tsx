import React from 'react';

function Author(props: any) {
  const { author, index } = props;

  const colorsMap = ['secondary', 'info', 'warning', 'danger'];
  function setColor(index: any) {
    let currentIndex = index;
    if (currentIndex > colorsMap.length - 1) {
      while (currentIndex >= colorsMap.length) {
        currentIndex -= colorsMap.length;
      }
    }
    return colorsMap[currentIndex];
  }

  return (
    <li className={`list-group-item list-group-item-${setColor(index)}`}>
      {author.name}
    </li>
  );
}

export default Author;
