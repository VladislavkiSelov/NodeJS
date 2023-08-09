const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU',
        {
            currency: 'rub',
            style: 'currency'
        }
    ).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})
const $card = document.querySelector('.card')



$card.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete_btn')) {
        const id = e.target.dataset.id;
        fetch('/card/delete/' + id, {
            method: "delete",
        })
            .then((res) => res.json())
            .then(card => {
                console.log(card);
                if (card.courses.length) {
                    const html = card.courses.map(value => {
                        return `<tr>
                <td>${value.title}</td>
                <td>${value.number}</td>
                <td>
                    <button class="btn btn-small delete_btn" data-id="${value.id}">Удалить</button>
                </td>
            </tr>`
                    }).join('')
                    console.log(html);
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = toCurrency(card.price)
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>'
                }
            })
    }
})
