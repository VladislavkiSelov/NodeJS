document.querySelectorAll('.price').forEach(item => {
    item.textContent = new Intl.NumberFormat('ru-RU',
        {
            currency: 'rub',
            style: 'currency'
        }
    ).format(item.textContent)
})


Array.from(document.querySelectorAll('.delete_btn')).forEach(item => {
    item.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        fetch('/card/delete/' + id, {
            method: "delete",
        })
            .then((res) => res.json())
            .then(card => {
                if (card.courses.length) {

                } else {
                    document.querySelector('.card').innerHTML = '<p>Корзина пуста</p>'
                }
            })
    })
})