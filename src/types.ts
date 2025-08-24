export interface IBook {
    _id: string,
    title: string,
    author: string
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY'
    isbn: string,
    copies: number,
    available: boolean,
}

export interface IBorrowSummary {
  totalQuantity: number
  book: IBorrowedBook
}

export interface IBorrowedBook {
  title: string
  isbn: string
}