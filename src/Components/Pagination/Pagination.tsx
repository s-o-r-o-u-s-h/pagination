import React, {FC} from "react";
import "./Pagination.css";

type Props = {
  perPage: number;
  currentPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<Props> = props => {

  const pages = Math.ceil(props.totalItems / props.perPage);

  function renderChildren() {
    const pageArray: any[] = [];
    let i = 0;
    while (i < pages) {
      if (i + 1 === 1 || i + 1 === pages) {
        pageArray.push(i);
      } else {
        if (props.currentPage === i + 1 || props.currentPage - i - 1 === 1 || i + 1 - props.currentPage === 1) {
          pageArray.push(i);
        } else {
          pageArray.push("...");
        }
      }
      i++;
    }

    return pageArray.map((item: any, index) => {
      if (item === "...") {
        if (pageArray[index - 1] !== "...") {
          return <span key={index} aria-label={"ellipsis"}>...</span>
        }
      } else {
        if (item + 1 === props.currentPage) {
          return <span key={index} aria-label="current page">{item + 1}</span>
        } else {
          return <button key={index} type="button" onClick={() => props.onChangePage(item + 1)}>{item + 1}</button>
        }
      }
    })
  }

  const onPrev = () => {
    if (props.currentPage > 1) {
      props.onChangePage(props.currentPage - 1);
    }
  }

  const onNext = () => {
    if (pages - props.currentPage > 0) {
      props.onChangePage(props.currentPage + 1);
    }
  }

  return (
    <div className="flex">
      <button type="button" onClick={() => props.onChangePage(1)}>{"<<"}</button>
      <button type="button" onClick={() => onPrev()}>{"<"}</button>
      {renderChildren()}
      <button type="button" onClick={() => onNext()}>{">"}</button>
      <button type="button" onClick={() => props.onChangePage(pages)}>{">>"}</button>
    </div>
  )
}

export default Pagination;