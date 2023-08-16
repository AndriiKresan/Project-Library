let myLibrary = [
  new Book("Later", "Steven King", 293, "Read"),
  new Book("American psycho", "Bred Iston Ellis", 342, "Not Read"),
];
const container = document.querySelector("#leftSide");
const submitButton = document.querySelector("#submitButton");

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  const bookName = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const bookPages = document.createElement("div");
  const bookRead = document.createElement("div");
  const verticalLine = document.createElement("div");
  const removeButton = document.createElement("button");

  bookElement.classList.add("bookElement");
  verticalLine.classList.add("line");
  bookRead.classList.add("book-is-read");
  removeButton.classList.add("removeButton");

  bookName.appendChild(document.createTextNode(book.name));
  bookAuthor.appendChild(document.createTextNode(book.author));
  bookPages.appendChild(document.createTextNode(book.pages));
  bookRead.appendChild(document.createTextNode(book.read));
  removeButton.appendChild(document.createTextNode("Remove"));

  removeButton.addEventListener("click", () => {
    bookElement.remove();
    myLibrary.splice(myLibrary.indexOf(book), 1);
  });

  bookRead.addEventListener("click", () => {
    if (bookRead.textContent === "Read") {
      bookRead.textContent = "Not Read";
      bookRead.style.color = "red";
    } else {
      bookRead.textContent = "Read";
      bookRead.style.color = "green";
    }
  });

  if (bookRead.textContent === "Read") {
    bookRead.style.color = "green";
  } else {
    bookRead.style.color = "red";
  }

  bookElement.appendChild(bookName);
  bookElement.appendChild(verticalLine);
  bookElement.appendChild(bookAuthor);
  bookElement.appendChild(verticalLine.cloneNode());
  bookElement.appendChild(bookPages);
  bookElement.appendChild(verticalLine.cloneNode());
  bookElement.appendChild(bookRead);
  bookElement.appendChild(removeButton);

  return bookElement;
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    container.appendChild(createBookElement(myLibrary[i]));
  }
}

function addBookToLibrary() {
  const name = document.getElementById("inputName").value;
  const author = document.getElementById("inputAuthor").value;
  const pages = document.getElementById("inputPages").value;
  let read = document.getElementById("inputRead").checked;

  if (read) {
    read = "Read";
  } else {
    read = "Not Read";
  }

  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
  container.appendChild(createBookElement(newBook));
}

function checkInputs() {
  let empty = true;

  for (let i = 0; i < 3; i++) {
    let inputElement = document.querySelectorAll("input")[i];
    if (inputElement.value == "") {
      empty = false;
      inputElement.style.backgroundColor = "red";
      inputElement.placeholder = "*Fill this field!";
    } else {
      empty = true;
      inputElement.style.backgroundColor = "black";
    }
  }
  return empty;
}

function clearInputs() {
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < 3; i++) {
    inputs[i].value = "";
    inputs[i].placeholder = "";
  }
  inputs[3].checked = false;
}

submitButton.addEventListener("click", () => {
  if (checkInputs()) {
    addBookToLibrary();
    clearInputs();
  }
});

displayBooks();
