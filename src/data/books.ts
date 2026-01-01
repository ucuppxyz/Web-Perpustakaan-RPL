export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  available: boolean;
  description: string;
  pages: number;
  year: number;
  pdfUrl?: string;
  trending?: boolean;
  popular?: boolean;
}

// Generator function untuk membuat variasi buku
const generateBooks = (): Book[] => {
  const books: Book[] = [];
  let id = 1;

  // KATEGORI FIKSI - 342 buku
  const fictionBooks = [
    // Klasik Sastra Dunia
    { title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, pages: 279, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, pages: 180, rating: 4.8, pdfUrl: 'https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf' },
    { title: 'Frankenstein', author: 'Mary Shelley', year: 1818, pages: 280, rating: 4.7, pdfUrl: 'https://www.planetebook.com/free-ebooks/frankenstein.pdf' },
    { title: 'Dracula', author: 'Bram Stoker', year: 1897, pages: 418, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/345/345-h/345-h.htm' },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, pages: 532, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/1260/1260-h/1260-h.htm' },
    { title: 'Wuthering Heights', author: 'Emily Brontë', year: 1847, pages: 416, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/768/768-h/768-h.htm' },
    { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', year: 1890, pages: 254, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/174/174-h/174-h.htm' },
    { title: 'Moby Dick', author: 'Herman Melville', year: 1851, pages: 635, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm' },
    { title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', year: 1876, pages: 274, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/74/74-h/74-h.htm' },
    { title: 'Adventures of Huckleberry Finn', author: 'Mark Twain', year: 1884, pages: 366, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/76/76-h/76-h.htm' },
    { title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', year: 1850, pages: 238, rating: 4.3, pdfUrl: 'https://www.gutenberg.org/files/25344/25344-h/25344-h.htm' },
    { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', year: 1844, pages: 1276, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/1184/1184-h/1184-h.htm' },
    { title: 'Les Misérables', author: 'Victor Hugo', year: 1862, pages: 1463, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/135/135-h/135-h.htm' },
    { title: 'War and Peace', author: 'Leo Tolstoy', year: 1869, pages: 1225, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/2600/2600-h/2600-h.htm' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy', year: 1877, pages: 864, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/1399/1399-h/1399-h.htm' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: 1866, pages: 671, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: 1880, pages: 796, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/28054/28054-h/28054-h.htm' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky', year: 1869, pages: 656, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/2638/2638-h/2638-h.htm' },
    { title: 'Don Quixote', author: 'Miguel de Cervantes', year: 1605, pages: 1072, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/996/996-h/996-h.htm' },
    { title: 'The Odyssey', author: 'Homer', year: -800, pages: 541, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/1727/1727-h/1727-h.htm' },
    { title: 'The Iliad', author: 'Homer', year: -750, pages: 683, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/6130/6130-h/6130-h.htm' },
    { title: 'The Divine Comedy', author: 'Dante Alighieri', year: 1320, pages: 798, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/8800/8800-h/8800-h.htm' },
    { title: 'Paradise Lost', author: 'John Milton', year: 1667, pages: 453, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/26/26-h/26-h.htm' },
    { title: 'The Canterbury Tales', author: 'Geoffrey Chaucer', year: 1400, pages: 504, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/2383/2383-h/2383-h.htm' },
    { title: 'Gulliver\'s Travels', author: 'Jonathan Swift', year: 1726, pages: 306, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/829/829-h/829-h.htm' },
    { title: 'Robinson Crusoe', author: 'Daniel Defoe', year: 1719, pages: 320, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/521/521-h/521-h.htm' },
    { title: 'Oliver Twist', author: 'Charles Dickens', year: 1838, pages: 608, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/730/730-h/730-h.htm' },
    { title: 'Great Expectations', author: 'Charles Dickens', year: 1861, pages: 544, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/1400/1400-h/1400-h.htm' },
    { title: 'A Tale of Two Cities', author: 'Charles Dickens', year: 1859, pages: 448, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/98/98-h/98-h.htm' },
    { title: 'David Copperfield', author: 'Charles Dickens', year: 1850, pages: 882, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/766/766-h/766-h.htm' },
    { title: 'Little Women', author: 'Louisa May Alcott', year: 1868, pages: 759, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/514/514-h/514-h.htm' },
    { title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', year: 1892, pages: 307, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/1661/1661-h/1661-h.htm' },
    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', year: 1902, pages: 256, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/2852/2852-h/2852-h.htm' },
    { title: 'The Time Machine', author: 'H.G. Wells', year: 1895, pages: 118, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/35/35-h/35-h.htm' },
    { title: 'The War of the Worlds', author: 'H.G. Wells', year: 1898, pages: 192, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/36/36-h/36-h.htm' },
    { title: 'The Invisible Man', author: 'H.G. Wells', year: 1897, pages: 190, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/5230/5230-h/5230-h.htm' },
    { title: 'Twenty Thousand Leagues Under the Sea', author: 'Jules Verne', year: 1870, pages: 335, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/164/164-h/164-h.htm' },
    { title: 'Around the World in Eighty Days', author: 'Jules Verne', year: 1873, pages: 167, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/103/103-h/103-h.htm' },
    { title: 'Journey to the Center of the Earth', author: 'Jules Verne', year: 1864, pages: 240, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/18857/18857-h/18857-h.htm' },
    { title: 'The Three Musketeers', author: 'Alexandre Dumas', year: 1844, pages: 625, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/1257/1257-h/1257-h.htm' },
    { title: 'Treasure Island', author: 'Robert Louis Stevenson', year: 1883, pages: 292, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/120/120-h/120-h.htm' },
    { title: 'The Strange Case of Dr. Jekyll and Mr. Hyde', author: 'Robert Louis Stevenson', year: 1886, pages: 96, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/43/43-h/43-h.htm' },
    { title: 'Heart of Darkness', author: 'Joseph Conrad', year: 1899, pages: 72, rating: 4.3, pdfUrl: 'https://www.gutenberg.org/files/219/219-h/219-h.htm' },
    { title: 'The Secret Garden', author: 'Frances Hodgson Burnett', year: 1911, pages: 331, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/113/113-h/113-h.htm' },
    { title: 'Anne of Green Gables', author: 'Lucy Maud Montgomery', year: 1908, pages: 388, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/45/45-h/45-h.htm' },
    { title: 'The Jungle Book', author: 'Rudyard Kipling', year: 1894, pages: 260, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/236/236-h/236-h.htm' },
    { title: 'Kim', author: 'Rudyard Kipling', year: 1901, pages: 368, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/2226/2226-h/2226-h.htm' },
    { title: 'The Call of the Wild', author: 'Jack London', year: 1903, pages: 232, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/215/215-h/215-h.htm' },
    { title: 'White Fang', author: 'Jack London', year: 1906, pages: 298, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/910/910-h/910-h.htm' },
    { title: 'The Age of Innocence', author: 'Edith Wharton', year: 1920, pages: 360, rating: 4.4, pdfUrl: 'https://www.gutenberg.org/files/541/541-h/541-h.htm' },
  ];

  const fictionImages = [
    'https://images.unsplash.com/photo-1679180174039-c84e26f1a78d?w=400',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400',
    'https://images.unsplash.com/photo-1491841651911-c44c30c34548?w=400',
  ];

  fictionBooks.forEach((book, index) => {
    for (let i = 0; i < 7; i++) {
      books.push({
        id: id++,
        title: book.title,
        author: book.author,
        category: 'Fiksi',
        rating: book.rating,
        image: fictionImages[(index + i) % fictionImages.length],
        available: Math.random() > 0.2,
        description: `Karya klasik dari ${book.author} yang telah menginspirasi generasi pembaca.`,
        pages: book.pages,
        year: book.year,
        pdfUrl: book.pdfUrl,
        trending: i === 0 && index < 5,
        popular: i === 1 && index < 8,
      });
    }
  });

  // KATEGORI SAINS - 198 buku
  const scienceBooks = [
    { title: 'On the Origin of Species', author: 'Charles Darwin', year: 1859, pages: 502, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/1228/1228-h/1228-h.htm' },
    { title: 'The Voyage of the Beagle', author: 'Charles Darwin', year: 1839, pages: 524, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/944/944-h/944-h.htm' },
    { title: 'Relativity: The Special and General Theory', author: 'Albert Einstein', year: 1916, pages: 168, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/30155/30155-pdf.pdf' },
    { title: 'The Autobiography of Charles Darwin', author: 'Charles Darwin', year: 1887, pages: 89, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/2010/2010-h/2010-h.htm' },
    { title: 'The Expression of Emotion', author: 'Charles Darwin', year: 1872, pages: 374, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/1227/1227-h/1227-h.htm' },
    { title: 'The Descent of Man', author: 'Charles Darwin', year: 1871, pages: 423, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/2300/2300-h/2300-h.htm' },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', year: 1988, pages: 256, rating: 4.8 },
    { title: 'Cosmos', author: 'Carl Sagan', year: 1980, pages: 365, rating: 4.9 },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', year: 1976, pages: 360, rating: 4.7 },
    { title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', year: 1962, pages: 212, rating: 4.6 },
    { title: 'The Double Helix', author: 'James Watson', year: 1968, pages: 226, rating: 4.5 },
    { title: 'Silent Spring', author: 'Rachel Carson', year: 1962, pages: 378, rating: 4.8 },
    { title: 'The Origin of Life', author: 'Alexander Oparin', year: 1936, pages: 270, rating: 4.4 },
    { title: 'Principia Mathematica', author: 'Isaac Newton', year: 1687, pages: 974, rating: 4.9 },
    { title: 'The Feynman Lectures on Physics', author: 'Richard Feynman', year: 1964, pages: 1552, rating: 4.9 },
    { title: 'QED: The Strange Theory', author: 'Richard Feynman', year: 1985, pages: 158, rating: 4.7 },
    { title: 'The First Three Minutes', author: 'Steven Weinberg', year: 1977, pages: 203, rating: 4.6 },
    { title: 'The Elegant Universe', author: 'Brian Greene', year: 1999, pages: 448, rating: 4.5 },
    { title: 'A Short History of Nearly Everything', author: 'Bill Bryson', year: 2003, pages: 544, rating: 4.8 },
    { title: 'The Demon-Haunted World', author: 'Carl Sagan', year: 1995, pages: 457, rating: 4.7 },
    { title: 'The Greatest Show on Earth', author: 'Richard Dawkins', year: 2009, pages: 470, rating: 4.6 },
    { title: 'The Third Chimpanzee', author: 'Jared Diamond', year: 1991, pages: 407, rating: 4.5 },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', year: 1997, pages: 498, rating: 4.7 },
    { title: 'The Language Instinct', author: 'Steven Pinker', year: 1994, pages: 525, rating: 4.6 },
    { title: 'How the Mind Works', author: 'Steven Pinker', year: 1997, pages: 660, rating: 4.5 },
    { title: 'The Blank Slate', author: 'Steven Pinker', year: 2002, pages: 528, rating: 4.6 },
    { title: 'Genome', author: 'Matt Ridley', year: 1999, pages: 344, rating: 4.4 },
    { title: 'The Red Queen', author: 'Matt Ridley', year: 1993, pages: 405, rating: 4.5 },
    { title: 'The Man Who Mistook His Wife for a Hat', author: 'Oliver Sacks', year: 1985, pages: 233, rating: 4.7 },
    { title: 'The Emperor of All Maladies', author: 'Siddhartha Mukherjee', year: 2010, pages: 571, rating: 4.8 },
  ];

  const scienceImages = [
    'https://images.unsplash.com/photo-1725869973689-425c74f79a48?w=400',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400',
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400',
  ];

  scienceBooks.forEach((book, index) => {
    for (let i = 0; i < 7; i++) {
      books.push({
        id: id++,
        title: book.title,
        author: book.author,
        category: 'Sains',
        rating: book.rating,
        image: scienceImages[(index + i) % scienceImages.length],
        available: Math.random() > 0.2,
        description: `Eksplorasi mendalam tentang sains dan penemuan ilmiah dari ${book.author}.`,
        pages: book.pages,
        year: book.year,
        pdfUrl: book.pdfUrl,
        trending: i === 0 && index < 3,
        popular: i === 1 && index < 5,
      });
    }
  });

  // KATEGORI SEJARAH - 156 buku
  const historyBooks = [
    { title: 'The Histories', author: 'Herodotus', year: -440, pages: 716, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/2707/2707-h/2707-h.htm' },
    { title: 'The Art of War', author: 'Sun Tzu', year: -500, pages: 273, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/132/132-h/132-h.htm' },
    { title: 'The History of the Decline and Fall of the Roman Empire', author: 'Edward Gibbon', year: 1776, pages: 3600, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/25717/25717-h/25717-h.htm' },
    { title: 'The Peloponnesian War', author: 'Thucydides', year: -400, pages: 648, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/7142/7142-h/7142-h.htm' },
    { title: 'Parallel Lives', author: 'Plutarch', year: 100, pages: 1200, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/674/674-h/674-h.htm' },
    { title: 'Commentaries on the Gallic War', author: 'Julius Caesar', year: -58, pages: 308, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/10657/10657-h/10657-h.htm' },
    { title: 'The Annals', author: 'Tacitus', year: 109, pages: 543, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/15021/15021-h/15021-h.htm' },
    { title: 'Meditations', author: 'Marcus Aurelius', year: 180, pages: 254, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/2680/2680-h/2680-h.htm' },
    { title: 'The Prince', author: 'Niccolò Machiavelli', year: 1532, pages: 140, rating: 4.6, pdfUrl: 'https://www.gutenberg.org/files/1232/1232-h/1232-h.htm' },
    { title: 'The History of the World', author: 'H.G. Wells', year: 1920, pages: 1324, rating: 4.5, pdfUrl: 'https://www.gutenberg.org/files/35461/35461-h/35461-h.htm' },
    { title: 'A History of the English-Speaking Peoples', author: 'Winston Churchill', year: 1956, pages: 2000, rating: 4.7 },
    { title: 'The Guns of August', author: 'Barbara Tuchman', year: 1962, pages: 511, rating: 4.8 },
    { title: 'A Distant Mirror', author: 'Barbara Tuchman', year: 1978, pages: 677, rating: 4.6 },
    { title: 'The Rise and Fall of the Third Reich', author: 'William Shirer', year: 1960, pages: 1249, rating: 4.7 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, pages: 443, rating: 4.9 },
    { title: 'Homo Deus', author: 'Yuval Noah Harari', year: 2015, pages: 440, rating: 4.7 },
    { title: '21 Lessons for the 21st Century', author: 'Yuval Noah Harari', year: 2018, pages: 372, rating: 4.6 },
    { title: 'The Silk Roads', author: 'Peter Frankopan', year: 2015, pages: 636, rating: 4.5 },
    { title: '1776', author: 'David McCullough', year: 2005, pages: 386, rating: 4.7 },
    { title: 'John Adams', author: 'David McCullough', year: 2001, pages: 751, rating: 4.8 },
    { title: 'Team of Rivals', author: 'Doris Kearns Goodwin', year: 2005, pages: 944, rating: 4.7 },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', year: 1947, pages: 283, rating: 4.9 },
  ];

  const historyImages = [
    'https://images.unsplash.com/photo-1613324767976-f65bc7d80936?w=400',
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400',
    'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400',
    'https://images.unsplash.com/photo-1585241936614-83b20e3d8b6e?w=400',
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=400',
    'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=400',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
  ];

  historyBooks.forEach((book, index) => {
    for (let i = 0; i < 7; i++) {
      books.push({
        id: id++,
        title: book.title,
        author: book.author,
        category: 'Sejarah',
        rating: book.rating,
        image: historyImages[(index + i) % historyImages.length],
        available: Math.random() > 0.2,
        description: `Analisis mendalam tentang peristiwa sejarah penting dari ${book.author}.`,
        pages: book.pages,
        year: book.year,
        pdfUrl: book.pdfUrl,
        trending: i === 0 && index < 3,
        popular: i === 1 && index < 4,
      });
    }
  });

  // KATEGORI TEKNOLOGI - 223 buku
  const technologyBooks = [
    { title: 'Structure and Interpretation of Computer Programs', author: 'Abelson & Sussman', year: 1985, pages: 657, rating: 4.9, pdfUrl: 'https://web.mit.edu/6.001/6.037/sicp.pdf' },
    { title: 'Introduction to Information Retrieval', author: 'Manning, Raghavan, Schütze', year: 2008, pages: 482, rating: 4.7, pdfUrl: 'https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf' },
    { title: 'The Elements of Computing Systems', author: 'Noam Nisan & Shimon Schocken', year: 2005, pages: 325, rating: 4.8 },
    { title: 'Clean Code', author: 'Robert C. Martin', year: 2008, pages: 464, rating: 4.8 },
    { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', year: 1999, pages: 352, rating: 4.9 },
    { title: 'Code Complete', author: 'Steve McConnell', year: 1993, pages: 960, rating: 4.7 },
    { title: 'Design Patterns', author: 'Gang of Four', year: 1994, pages: 416, rating: 4.6 },
    { title: 'Introduction to Algorithms', author: 'Cormen et al.', year: 1990, pages: 1312, rating: 4.8 },
    { title: 'The Art of Computer Programming', author: 'Donald Knuth', year: 1968, pages: 650, rating: 4.9 },
    { title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', year: 1995, pages: 1152, rating: 4.8 },
    { title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', year: 2016, pages: 800, rating: 4.7 },
    { title: 'The Mythical Man-Month', author: 'Frederick Brooks', year: 1975, pages: 336, rating: 4.6 },
    { title: 'Refactoring', author: 'Martin Fowler', year: 1999, pages: 448, rating: 4.7 },
    { title: 'Domain-Driven Design', author: 'Eric Evans', year: 2003, pages: 560, rating: 4.6 },
    { title: 'Peopleware', author: 'DeMarco & Lister', year: 1987, pages: 245, rating: 4.5 },
    { title: 'The Phoenix Project', author: 'Gene Kim', year: 2013, pages: 345, rating: 4.7 },
    { title: 'Accelerate', author: 'Forsgren, Humble, Kim', year: 2018, pages: 288, rating: 4.6 },
    { title: 'Site Reliability Engineering', author: 'Google', year: 2016, pages: 550, rating: 4.8 },
    { title: 'Computer Networks', author: 'Andrew Tanenbaum', year: 1981, pages: 891, rating: 4.7 },
    { title: 'Operating Systems', author: 'Silberschatz', year: 1983, pages: 944, rating: 4.6 },
    { title: 'Database System Concepts', author: 'Silberschatz et al.', year: 1986, pages: 1376, rating: 4.5 },
    { title: 'Compilers', author: 'Aho, Lam, Sethi, Ullman', year: 1986, pages: 1035, rating: 4.7 },
    { title: 'Computer Architecture', author: 'Hennessy & Patterson', year: 1990, pages: 856, rating: 4.8 },
    { title: 'The C Programming Language', author: 'Kernighan & Ritchie', year: 1978, pages: 272, rating: 4.9 },
    { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', year: 2008, pages: 176, rating: 4.5 },
    { title: 'Effective Java', author: 'Joshua Bloch', year: 2001, pages: 416, rating: 4.8 },
    { title: 'Python Crash Course', author: 'Eric Matthes', year: 2015, pages: 560, rating: 4.7 },
    { title: 'The Innovators', author: 'Walter Isaacson', year: 2014, pages: 560, rating: 4.6 },
    { title: 'The Soul of A New Machine', author: 'Tracy Kidder', year: 1981, pages: 293, rating: 4.5 },
    { title: 'Hackers', author: 'Steven Levy', year: 1984, pages: 458, rating: 4.7 },
    { title: 'The Cathedral and the Bazaar', author: 'Eric Raymond', year: 1999, pages: 241, rating: 4.4 },
    { title: 'The Lean Startup', author: 'Eric Ries', year: 2011, pages: 336, rating: 4.6 },
  ];

  const technologyImages = [
    'https://images.unsplash.com/photo-1613253932202-686cbcd993b0?w=400',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
  ];

  technologyBooks.forEach((book, index) => {
    for (let i = 0; i < 7; i++) {
      books.push({
        id: id++,
        title: book.title,
        author: book.author,
        category: 'Teknologi',
        rating: book.rating,
        image: technologyImages[(index + i) % technologyImages.length],
        available: Math.random() > 0.2,
        description: `Panduan komprehensif teknologi dan pemrograman dari ${book.author}.`,
        pages: book.pages,
        year: book.year,
        pdfUrl: book.pdfUrl,
        trending: i === 0 && index < 4,
        popular: i === 1 && index < 6,
      });
    }
  });

  // KATEGORI ANAK - 328 buku
  const childrenBooks = [
    { title: 'Alice\'s Adventures in Wonderland', author: 'Lewis Carroll', year: 1865, pages: 96, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/11/11-h/11-h.htm' },
    { title: 'The Tale of Peter Rabbit', author: 'Beatrix Potter', year: 1902, pages: 72, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/14838/14838-h/14838-h.htm' },
    { title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', year: 1900, pages: 259, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/55/55-h/55-h.htm' },
    { title: 'The Adventures of Pinocchio', author: 'Carlo Collodi', year: 1883, pages: 206, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/500/500-h/500-h.htm' },
    { title: 'Aesop\'s Fables', author: 'Aesop', year: -600, pages: 306, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/11339/11339-h/11339-h.htm' },
    { title: 'Grimm\'s Fairy Tales', author: 'Brothers Grimm', year: 1812, pages: 584, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/2591/2591-h/2591-h.htm' },
    { title: 'Hans Christian Andersen\'s Fairy Tales', author: 'Hans Christian Andersen', year: 1835, pages: 428, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/1597/1597-h/1597-h.htm' },
    { title: 'The Wind in the Willows', author: 'Kenneth Grahame', year: 1908, pages: 272, rating: 4.7, pdfUrl: 'https://www.gutenberg.org/files/289/289-h/289-h.htm' },
    { title: 'Peter Pan', author: 'J.M. Barrie', year: 1911, pages: 207, rating: 4.8, pdfUrl: 'https://www.gutenberg.org/files/16/16-h/16-h.htm' },
    { title: 'The Velveteen Rabbit', author: 'Margery Williams', year: 1922, pages: 32, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/11757/11757-h/11757-h.htm' },
    { title: 'Charlotte\'s Web', author: 'E.B. White', year: 1952, pages: 184, rating: 4.9 },
    { title: 'Where the Wild Things Are', author: 'Maurice Sendak', year: 1963, pages: 48, rating: 4.8 },
    { title: 'The Cat in the Hat', author: 'Dr. Seuss', year: 1957, pages: 61, rating: 4.8 },
    { title: 'Green Eggs and Ham', author: 'Dr. Seuss', year: 1960, pages: 62, rating: 4.9 },
    { title: 'Goodnight Moon', author: 'Margaret Wise Brown', year: 1947, pages: 32, rating: 4.8 },
    { title: 'The Very Hungry Caterpillar', author: 'Eric Carle', year: 1969, pages: 26, rating: 4.9 },
    { title: 'Brown Bear, Brown Bear', author: 'Bill Martin Jr.', year: 1967, pages: 28, rating: 4.8 },
    { title: 'Corduroy', author: 'Don Freeman', year: 1968, pages: 32, rating: 4.7 },
    { title: 'Make Way for Ducklings', author: 'Robert McCloskey', year: 1941, pages: 68, rating: 4.8 },
    { title: 'Curious George', author: 'H.A. Rey', year: 1941, pages: 56, rating: 4.7 },
    { title: 'Harold and the Purple Crayon', author: 'Crockett Johnson', year: 1955, pages: 64, rating: 4.6 },
    { title: 'Madeline', author: 'Ludwig Bemelmans', year: 1939, pages: 56, rating: 4.7 },
    { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', year: 1943, pages: 96, rating: 4.9, pdfUrl: 'https://www.gutenberg.org/files/13635/13635-h/13635-h.htm' },
    { title: 'Winnie-the-Pooh', author: 'A.A. Milne', year: 1926, pages: 161, rating: 4.8 },
    { title: 'The House at Pooh Corner', author: 'A.A. Milne', year: 1928, pages: 180, rating: 4.7 },
    { title: 'The Chronicles of Narnia', author: 'C.S. Lewis', year: 1950, pages: 767, rating: 4.9 },
    { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997, pages: 223, rating: 4.9 },
    { title: 'Matilda', author: 'Roald Dahl', year: 1988, pages: 240, rating: 4.8 },
    { title: 'Charlie and the Chocolate Factory', author: 'Roald Dahl', year: 1964, pages: 176, rating: 4.8 },
    { title: 'The BFG', author: 'Roald Dahl', year: 1982, pages: 208, rating: 4.7 },
    { title: 'James and the Giant Peach', author: 'Roald Dahl', year: 1961, pages: 160, rating: 4.7 },
    { title: 'Fantastic Mr. Fox', author: 'Roald Dahl', year: 1970, pages: 96, rating: 4.6 },
    { title: 'The Gruffalo', author: 'Julia Donaldson', year: 1999, pages: 32, rating: 4.9 },
    { title: 'Room on the Broom', author: 'Julia Donaldson', year: 2001, pages: 32, rating: 4.8 },
    { title: 'The Snail and the Whale', author: 'Julia Donaldson', year: 2003, pages: 32, rating: 4.7 },
    { title: 'Guess How Much I Love You', author: 'Sam McBratney', year: 1994, pages: 32, rating: 4.9 },
    { title: 'Love You Forever', author: 'Robert Munsch', year: 1986, pages: 32, rating: 4.8 },
    { title: 'The Giving Tree', author: 'Shel Silverstein', year: 1964, pages: 64, rating: 4.7 },
    { title: 'Where the Sidewalk Ends', author: 'Shel Silverstein', year: 1974, pages: 176, rating: 4.8 },
    { title: 'A Light in the Attic', author: 'Shel Silverstein', year: 1981, pages: 167, rating: 4.7 },
    { title: 'If You Give a Mouse a Cookie', author: 'Laura Numeroff', year: 1985, pages: 40, rating: 4.8 },
    { title: 'The Rainbow Fish', author: 'Marcus Pfister', year: 1992, pages: 32, rating: 4.6 },
    { title: 'Chicka Chicka Boom Boom', author: 'Bill Martin Jr.', year: 1989, pages: 36, rating: 4.7 },
    { title: 'Llama Llama Red Pajama', author: 'Anna Dewdney', year: 2005, pages: 40, rating: 4.8 },
    { title: 'Don\'t Let the Pigeon Drive the Bus!', author: 'Mo Willems', year: 2003, pages: 40, rating: 4.7 },
    { title: 'Olivia', author: 'Ian Falconer', year: 2000, pages: 40, rating: 4.6 },
  ];

  const childrenImages = [
    'https://images.unsplash.com/photo-1631426964394-06606872d836?w=400',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
  ];

  childrenBooks.forEach((book, index) => {
    for (let i = 0; i < 7; i++) {
      books.push({
        id: id++,
        title: book.title,
        author: book.author,
        category: 'Anak',
        rating: book.rating,
        image: childrenImages[(index + i) % childrenImages.length],
        available: Math.random() > 0.15,
        description: `Cerita menarik dan penuh imajinasi untuk anak-anak dari ${book.author}.`,
        pages: book.pages,
        year: book.year,
        pdfUrl: book.pdfUrl,
        trending: i === 0 && index < 5,
        popular: i === 1 && index < 8,
      });
    }
  });

  return books;
};

// Generate all books
export const allBooks: Book[] = generateBooks();

// Get books by category
export const getBooksByCategory = (category: string): Book[] => {
  if (category === 'Semua') return allBooks;
  return allBooks.filter((book) => book.category === category);
};

// Get trending books
export const getTrendingBooks = (): Book[] => {
  return allBooks.filter((book) => book.trending);
};

// Get popular books
export const getPopularBooks = (): Book[] => {
  return allBooks.filter((book) => book.popular);
};

// Get all books
export const getAllBooks = (): Book[] => {
  return allBooks;
};

// Get book by ID
export const getBookById = (id: number): Book | undefined => {
  return allBooks.find((book) => book.id === id);
};

// Search books
export const searchBooks = (query: string): Book[] => {
  const lowercaseQuery = query.toLowerCase();
  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Get statistics
export const getStatistics = () => {
  const totalRating = allBooks.reduce((sum, book) => sum + book.rating, 0);
  const averageRating = allBooks.length > 0 ? totalRating / allBooks.length : 0;
  
  return {
    totalBooks: allBooks.length,
    categoryCount: {
      Fiksi: allBooks.filter((b) => b.category === 'Fiksi').length,
      Sains: allBooks.filter((b) => b.category === 'Sains').length,
      Sejarah: allBooks.filter((b) => b.category === 'Sejarah').length,
      Teknologi: allBooks.filter((b) => b.category === 'Teknologi').length,
      Anak: allBooks.filter((b) => b.category === 'Anak').length,
    },
    availableBooks: allBooks.filter((b) => b.available).length,
    borrowedBooks: allBooks.filter((b) => !b.available).length,
    averageRating: averageRating,
  };
};