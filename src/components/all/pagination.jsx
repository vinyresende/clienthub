import Button from "../all/button"

export default function ListPagination({ page, totalPages, setPage }) {
    return (
        <>
            <span className="text-[14px]">Página {page} de {totalPages}</span>

            <Button
                className="px-1 py-1"
                {...page == 1 ? {disabled: true} : {}}
                onClick={() => { setPage(1) }}
            >
                <i className='bx bx-chevrons-left'/>
            </Button>

            <Button
                className="px-1 py-1"
                {...page == 1 ? {disabled: true} : {}}
                onClick={() => { setPage(page-1) }}
            >
                <i className='bx bx-chevron-left'/>
            </Button>

            <Button
                className="px-1 py-1"
                {...page === totalPages ? {disabled: true} : {}}
                onClick={() => { setPage(page+1) }}
            >
                <i className='bx bx-chevron-right'/>
            </Button>

            <Button
                className="px-1 py-1"
                {...page === totalPages ? {disabled: true} : {}}
                onClick={() => { setPage(totalPages) }}
            >
                <i className='bx bx-chevrons-right'/>
            </Button>
        </>
    )
}