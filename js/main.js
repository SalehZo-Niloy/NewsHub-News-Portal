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
        categoryBtn.classList.add('py-1', 'px-2', 'bg-neutral-300', 'rounded', 'text-md', 'md:text-xl', 'font-semibold');
        categoryBtn.innerText = `${category.category_name}`;
        newsCategorySection.appendChild(categoryBtn);
        // adding event listener
        categoryBtn.addEventListener('click', async () => {
            const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`);
            const data = await res.json();
            console.log(data.data);
            displayNews(data.data);
            newsCount(category.category_name, data.data);
        }
        )
    });
}

// display news divs
const displayNews = (allNews) => {
    const newsPostSection = document.getElementById('news-preview');
    newsPostSection.innerHTML = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div
            class="flex flex-col items-center bg-gray-200 rounded-lg shadow-md md:flex-row w-3/4 hover:bg-gray-300
            my-4 mx-auto">
            <img class="object-cover w-full h-48 rounded-t-lg md:h-56 md:w-72 md:rounded-none md:rounded-l-lg"
                src="${news.image_url}" alt="">
            <div class="w-full flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900">${news.title}</h5>
                <p class="mb-3 text-sm md:text-base font-normal text-gray-700">${news.details.slice(0, 200)}...</p>
                <div class="flex flex-row justify-around items-center flex-wrap">
                    <div class="flex items-center">
                        <img class="h-9 rounded-full" src="${news.author.img ? news.author.img : '#'}">
                        <h3 class="text-sm font-medium mx-1">${news.author.name ? news.author.name : "Author Not Found"}</h3>
                    </div>
                    <div><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No Views'}</div>
                    <div class="mt-3 md:mt-0"><button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="loadDetails('${news._id}')">
                    Details
                  </button></div>
                </div>
            </div>
        </div>
        `
        newsPostSection.appendChild(newsDiv);
    })

}

// display news count section
const newsCount = (categoryName, data) => {
    const newsCountSection = document.getElementById('news-count');
    newsCountSection.innerHTML = ``;
    newsCountSection.innerHTML = `
        <div class="w-3/4 mx-auto bg-gray-400 px-3 py-1 rounded text-lg font-semibold">
        <p>${data.length} items found for category ${categoryName}</p>
        </div>
    `
}

// news details modal section
const loadDetails = async (id) => {
    const modalSection = document.getElementById('detailsModal');
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const data = await res.json();
    const news = data.data[0];
    const modalTitle = document.getElementById('detailsModalLabel');
    modalTitle.innerText = `${news.title}`;
    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `
    <img class="w-10/12 mx-auto rounded"
        src="${news.image_url}"
        alt="">
    `;
    const modalDetails = document.getElementById('modalDetails');
    modalDetails.innerText = `${news.details}`;
    const author = document.getElementById('author');
    author.innerHTML = `
    <img class="h-9 rounded-full" src="${news.author.img ? news.author.img : '#'}">
    <h3 class="text-sm font-medium mx-1">${news.author.name ? news.author.name : "Author Not Found"}</h3>
    `;
    const views = document.getElementById('views');
    views.innerHTML = `<i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No Views'}`;

}


loadCategories();