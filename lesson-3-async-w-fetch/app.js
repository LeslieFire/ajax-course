(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

		fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
		    headers: {
				Authorization: 'Client-ID 396ab53844833485b2340fa1c1c62775d9641861231c771e2e6c77b7b14f639a'
		    }
		}).then(response => response.json())
		.then(addImage)
		.catch(e => requestError(e, 'image'));

		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=839c6639b4cc4fa0afb53e0d2333bbde`)
		.then(response => response.json())
		.then(addArticles)
		.catch(e => requestError(e, 'articles'));
    });

	function addImage(images) {
		let htmlContent = '';
		if (images && images.results && images.results[0]) {
			const firstImage = images.results[0]

			htmlContent = `<figure>
				<img src="${firstImage.urls.regular}" alt="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`;
		} else {
			htmlContent = '<div class="error-no-image">No images available</div>';
		}

		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

	function requestError(e, part) {
	    console.log(e);
	    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
	}

	function addArticles (articles) {
		let htmlContent = '';

		if (articles && articles.response && articles.response.docs && articles.response.docs.length >= 1) {
			htmlContent = '<ul>' + 
				articles.response.docs.map(article => 
					`<li class="article">
						<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
						<p>${article.snippet}</p>
					</li>`
				).join('') + '</ul>';
		} else {
			htmlContent = '<div class="error-no-articles">No articles available</div>';				
		}

		responseContainer.insertAdjacentHTML('beforeend', htmlContent);
	}

})();

