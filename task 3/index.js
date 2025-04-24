let books = [];

    document.getElementById('bookForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const author = document.getElementById('author').value.trim();
      const category = document.getElementById('category').value.trim();
      books.push({ title, author, category, borrowed: false, history: [] });
      this.reset();
      displayBooks();
    });

    document.getElementById('search').addEventListener('input', displayBooks);

    function displayBooks() {
      const searchTerm = document.getElementById('search').value.toLowerCase();
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';

      books
        .filter(book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm))
        .forEach((book, index) => {
          const div = document.createElement('div');
          div.className = 'book' + (book.borrowed ? ' borrowed' : '');
          div.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} <br/>
            <em>Category: ${book.category}</em> <br/>
            <button onclick="toggleBorrow(${index})">${book.borrowed ? 'Return Book' : 'Borrow Book'}</button>
            <div class="history">History: ${book.history.join(', ') || 'None'}</div>
          `;
          bookList.appendChild(div);
        });
    }

    function toggleBorrow(index) {
      const book = books[index];
      book.borrowed = !book.borrowed;
      book.history.push(book.borrowed ? 'Borrowed' : 'Returned');
      displayBooks();
    }