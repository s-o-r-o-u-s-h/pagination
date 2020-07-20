import React from "react";
import Pagination from "./Pagination";
import {render, screen, fireEvent} from "@testing-library/react";

describe("Pagination", () => {
  it('should show previous and next buttons correctly', function () {
    render(<Pagination perPage={3} currentPage={1} totalItems={15} onChangePage={() => {
    }}/>);
    screen.getByRole("button", {name: "<"});
    screen.getByRole("button", {name: ">"});
  });

  it('should show first and last page buttons correctly', function () {
    render(<Pagination perPage={3} currentPage={1} totalItems={15} onChangePage={() => {
    }}/>);
    screen.getByRole("button", {name: "<<"});
    screen.getByRole("button", {name: ">>"});
  });

  it('should not render current page as a button', function() {
    const currentPage = 3;
    render(<Pagination perPage={3} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>);
    expect(screen.queryByRole("button", { name: currentPage + ""})).toBeNull();
  });

  it('should render adjacent current page numbers as button', function () {
    const currentPage = 3;
    render(<Pagination perPage={3} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>);
    screen.getByRole("button", {name: (currentPage - 1) + ""});
    screen.getByRole("button", {name: (currentPage + 1) + ""});
  });

  it('should render other numbers as "..."', function () {
    let currentPage = 2;
    const {rerender} = render(<Pagination perPage={2} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>);
    expect(screen.queryAllByLabelText("ellipsis").length).toBe(1);

    currentPage += 3 ;
    rerender(<Pagination perPage={2} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>);
    expect(screen.queryAllByLabelText("ellipsis").length).toBe(2);

    currentPage = 7;
    rerender(<Pagination perPage={2} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>);
    expect(screen.queryAllByLabelText("ellipsis").length).toBe(1);
  });

  it('should always render first and last page numbers as button if they are not current page', function () {
    let currentPage = 2;
    const perPage = 2;
    const totalItems = 15;
    const lastPage = Math.ceil(totalItems / perPage);
    const {rerender} = render(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={() => {
    }}/>);
    screen.getByRole("button", {name: "1"});
    screen.getByRole("button", {name: lastPage + ""});

    currentPage = 5;
    rerender(<Pagination perPage={2} currentPage={currentPage} totalItems={15} onChangePage={() => {
    }}/>)
    screen.getByRole("button", {name: "1"});
    screen.getByRole("button", {name: lastPage+ ""});
  });

  it('should change currentPage whenever last and first buttons are clicked', function () {
    let currentPage = 3;
    const perPage = 2;
    const totalItems = 15;
    const lastPage = Math.ceil(totalItems / perPage);
    const mockFn = jest.fn((page: number) => {currentPage = page});
    const {rerender} = render(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);

    fireEvent.click(screen.getByRole("button", {name: "<<"}));
    expect(mockFn).toHaveBeenCalledWith(1);
    expect(currentPage).toBe(1);

    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: "1"})).toBeNull();

    fireEvent.click(screen.getByRole("button", {name: ">>"}));
    expect(mockFn).toHaveBeenCalledWith(lastPage);
    expect(currentPage).toBe(lastPage);
    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: lastPage + ""})).toBeNull();
  });

  it('should change currentPage whenever next and previous buttons are clicked', function () {
    let currentPage = 3;
    const perPage = 2;
    const totalItems = 15;
    const mockFn = jest.fn((page: number) => {currentPage = page});
    const {rerender} = render(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);

    fireEvent.click(screen.getByRole("button", {name: "<"}));
    expect(mockFn).toHaveBeenCalledWith(2);
    expect(currentPage).toBe(2);

    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: "2"})).toBeNull();

    fireEvent.click(screen.getByRole("button", {name: ">"}));
    expect(mockFn).toHaveBeenCalledWith(3);
    expect(currentPage).toBe(3);
    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: "3"})).toBeNull();
  });

  it('should change currentPage if adjacent buttons are clicked', function () {
    let currentPage = 3;
    const perPage = 2;
    const totalItems = 15;
    const mockFn = jest.fn((page: number) => {currentPage = page});
    const {rerender} = render(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);

    fireEvent.click(screen.getByRole("button", {name: "4"}));

    expect(mockFn).toHaveBeenCalledWith(4);
    expect(currentPage).toBe(4);
    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: "4"})).toBeNull();

    fireEvent.click(screen.getByRole("button", {name: "3"}));

    expect(mockFn).toHaveBeenCalledWith(3);
    expect(currentPage).toBe(3);
    rerender(<Pagination perPage={perPage} currentPage={currentPage} totalItems={totalItems} onChangePage={mockFn}/>);
    expect(screen.queryByRole("button", {name: "3"})).toBeNull();
  });
});