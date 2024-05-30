'use client'
import { Seller } from '@/lib/models/SellerModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import moment from 'moment'
import 'moment/locale/pt-br'

export default function Sellers() {
  const { data: sellers, error } = useSWR(`/api/admin/sellers`)
  const { trigger: deleteSeller } = useSWRMutation(
    `/api/admin/sellers`,
    async (url, { arg }: { arg: { sellerId: string } }) => {
      const toastId = toast.loading('Excluindo vendedor...')
      const res = await fetch(`${url}/${arg.sellerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('Vendedor excluído com sucesso', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )
  if (error) return 'Ocorreu um erro.'
  if (!sellers) return 'Carregando...'

  moment.locale('pt-br')

  return (
    <div>
      <h1 className="py-4 text-2xl">Vendedores</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Documento
              </th>
              <th scope="col" className="px-6 py-3">
                Nome da loja
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Plano Mensal
              </th>
              <th scope="col" className="px-6 py-3">
                Compl. contrato
              </th>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Pagamento
              </th>
              <th scope="col" className="px-6 py-3">
                Acões:
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller: Seller) => (
              <tr key={seller._id}>
                <td>{formatId(seller._id)}</td>
                <td>{seller.user?.name}</td>
                <td>{seller.sellerContract?.cpf}</td>
                <td>{seller.sellerContract.storename}</td>
                <td>{seller.sellerContract.phone}</td>
                <td>{seller.sellerContract.contract}</td>
                <td>{seller.sellerContract.complement}</td>
                <td>{seller.sellerContract.description}</td>
                <td>
                  {seller.isPaid && seller.paidAt
                    ? `${moment(seller.paidAt).format('DD/MM/yyyy')}`
                    : 'pendente'}
                </td>

                <td>
                  <Link
                    href={`/admin/sellers/${seller._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Editar
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteSeller({ sellerId: seller._id })}
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
