'use client'
import { Review } from '@/lib/models/ReviewModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function Reviews() {
  const { data: reviews, error } = useSWR(`/api/admin/reviews`)
  const { trigger: deleteReview } = useSWRMutation(
    `/api/admin/reviews`,
    async (url, { arg }: { arg: { reviewId: string } }) => {
      const toastId = toast.loading('Excluindo avaliação...')
      const res = await fetch(`${url}/${arg.reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('Avaliação excluída com sucesso', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )
  if (error) return 'Ocorreu um erro.'
  if (!reviews) return 'Carregando...'

  return (
    <div>
      <h1 className="py-4 text-2xl">Avaliações</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Comentário</th>
              <th>Avaliação</th>
              <th>Acões:</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review: Review) => (
              <tr key={review._id}>
                <td>{formatId(review._id)}</td>
                <td>{review.name}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>

                <td>
                  <Link
                    href={`/admin/sellers/${review._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Editar
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteReview({ reviewId: review._id })}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
