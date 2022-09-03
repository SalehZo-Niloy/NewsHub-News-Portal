// fetching news categories
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    displayCategories(data.data.news_category);
}

// display fetched categories as button in page
const displayCategories = categories => {
    const newsCategorySection = document.getElementById('news-category');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('py-1', 'px-2', 'bg-neutral-300', 'rounded', 'text-xl', 'font-semibold');
        categoryBtn.innerText = `${category.category_name}`;
        newsCategorySection.appendChild(categoryBtn);
        // adding event listener
        categoryBtn.addEventListener('click', async () => {
            const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`);
            const data = await res.json();
            console.log(data.data);
            displayNews(data.data);
        }
        )
    });
}

// display news divs
const displayNews = (allNews) => {
    const newsPostSection = document.getElementById('news-preview');
    newsPostSection.innerHTML = '';
    const newsCountSection = document.getElementById
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div
            class="flex flex-col items-center bg-gray-200 rounded-lg shadow-md md:flex-row w-3/4 hover:bg-gray-300
            my-4 mx-auto">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-56 md:w-72 md:rounded-none md:rounded-l-lg"
                src="${news.image_url}" alt="">
            <div class="w-full flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${news.title}</h5>
                <p class="mb-3 font-normal text-gray-700">${news.details.slice(0, 250)}...</p>
                <div class="flex flex-row justify-around items-center">
                    <div class="flex items-center">
                        <img class="h-9 rounded-full" src="${news.author.img ? news.author.img : '#'}">
                        <h3 class="text-sm font-medium mx-1">${news.author.name ? news.author.name : "Author Not Found"}</h3>
                    </div>
                    <div><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No Views'}</div>
                    <div><button class="bg-blue-700 text-white rounded px-3 py-1">Details</button></div>
                </div>
            </div>
        </div>
        `
        newsPostSection.appendChild(newsDiv);
    })


}

loadCategories();