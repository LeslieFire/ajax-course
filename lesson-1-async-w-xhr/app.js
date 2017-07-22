(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

		function addImage(){
			let htmlContent = '';
			const data = JSON.parse(this.responseText);

			if (data && data.results && data.results[0]) {
				const firstImage = data.results[0]

				htmlContent = `<figure>
					<img src="${firstImage.urls.regular}" alt="${searchedForText}">
					<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				</figure>`;
			} else {
				htmlContent = '<div class="error-no-image">No images available</div>';
			}

			responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}

		const unsplashRequest = new XMLHttpRequest();

		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID 8a33b8c587ac1fdfcf362ed39fd5dea033dabb3f05f24e6a2e8d2a8544ca6e95');
		unsplashRequest.send()

    });
})();
