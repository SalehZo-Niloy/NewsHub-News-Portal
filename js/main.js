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
            console.log(data);
        }
        )
    });
}

// display news divs
const displayNews = () => {
    const newsPost = document.getElementById('news-preview');

}

loadCategories();