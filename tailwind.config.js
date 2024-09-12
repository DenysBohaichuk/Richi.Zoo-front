/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/**/*.html", // Усі HTML файли у папці public
        "./src/**/*.{vue,js}", // Усі Vue та JavaScript файли у папці src
        // Якщо ви плануєте використовувати Tailwind у файлах з інших папок (наприклад, plugins),
        // додайте також ці шляхи сюди.
    ],
    theme: {
        extend: {
            colors: {
                deepsea: '#385773',
                azure: '#5BA9D9',
                cerulean: '#73BCD9',
                umber: '#8C5B30',
                sandstone: '#D9A882',

                grey: '#484848',
            },
        },
    },
    plugins: [
        // Тут можна додати плагіни Tailwind, якщо вони потрібні
    ],
};


