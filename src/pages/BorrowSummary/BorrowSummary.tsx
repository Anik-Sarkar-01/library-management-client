import { useGetBorrowSummaryQuery } from "../../redux/api/baseApi"
import type { IBorrowSummary } from "../../types";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  if (isLoading) {
    return <p className="text-center">Loading...</p>
  }
  return (
    <div>
      <div className="overflow-x-auto rounded-box border shadow border-base-content/5 bg-base-100 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Book Title</th>
              <th>ISBN</th>
              <th>Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data?.data.map((item: IBorrowSummary, idx: number) => (
              <tr key={item.book.isbn}>
                <th>{idx + 1}</th>
                <td>{item.book.title}</td>
                <td>{item.book.isbn}</td>
                <td>{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}
