// Funções para formatar inputs
// usadas em onInput event

export function cpfFormat(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

export function rgFormat(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3")
}

export function phoneFormat(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
}

export function dateFormat(e) {
    e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
}
