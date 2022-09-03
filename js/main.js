// global variables
const newsPostSection = document.getElementById('news-preview');
const newsCountSection = document.getElementById('news-count');
const sortSection = document.getElementById('sort-section');

// fetching news categories
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (e) {
        console.log(`There is an error in fetching api and the error is ` + e)
    }
}

// display fetched categories as button in page
const displayCategories = categories => {
    // default news show
    loadDefaultNews('08', 'All News');
    // adding event listener
    const newsCategorySection = document.getElementById('news-category');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('py-1', 'px-2', 'bg-neutral-300', 'rounded', 'text-md', 'md:text-xl', 'font-semibold');
        categoryBtn.innerText = `${category.category_name}`;
        newsCategorySection.appendChild(categoryBtn);
        categoryBtn.addEventListener('click', async () => {
            //hiding sections
            newsCountSection.innerHTML = '';
            sortSection.style.display = 'none';
            newsPostSection.innerHTML = '';
            // loading spinner
            spinner(true);
            try {
                const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category.category_id}`);
                const data = await res.json();
                newsCount(category.category_name, data.data);
                sortSection.style.display = 'flex';
                displayNews(data.data);
            }
            catch (e) {
                console.log(`There is an error in fetching api and the error is ` + e)
            }
            // spinner hidden
            spinner(false);
        }
        )
    });
}

// display news divs
const displayNews = (allNews) => {
    allNews.sort(function (a, b) { return b.total_view - a.total_view });
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
                <div class="flex flex-row justify-around items-center flex-wrap gap-x-8 md:gap-x-0">
                    <div class="flex flex-col md:flex-row items-center">
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
    newsCountSection.innerHTML = `
        <div class="w-3/4 mx-auto bg-gray-400 px-3 py-1 rounded text-lg font-semibold">
        <p>${data.length} items found for category ${categoryName}</p>
        </div>
    `
}

// news details modal section fetching
const loadDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
        const data = await res.json();
        loadModal(data.data[0]);
    }
    catch (e) {
        console.log(`There is an error in fetching api and the error is ` + e);
    }
}

// dynamic modal function
const loadModal = news => {
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

// spinner section 
const spinner = (isLoading) => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('hidden');
    }
    else {
        spinnerSection.classList.add('hidden');
    }
}

// default load news function
const loadDefaultNews = async (id, category_name) => {
    spinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        newsCount(category_name, data.data);
        sortSection.style.display = 'flex';
        displayNews(data.data);
    }
    catch (e) {
        console.log(`There is an error in fetching api and the error is ` + e)
    }
    spinner(false);
}


loadCategories();