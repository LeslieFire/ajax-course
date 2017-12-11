(function () {
	const form = document.querySelector('#search-form');
	const searchField = document.querySelector('#search-keyword')
	let searchedForText;
	const responseContainer = $('#response-container')

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		responseContainer.html('') ;
		searchedForText = searchField.value;


		$.ajax({
			url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
			headers: {
				Authorization: 'Client-ID 396ab53844833485b2340fa1c1c62775d9641861231c771e2e6c77b7b14f639a'
			}
		}).done(addImage);


		$.ajax({
			url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=0feb6a1a10ea4aa8a0176972eef9e16a`
		}).done(addArticles);


	});

	function addImage(images) {
		let htmlContent = '';

		if (images && images.results && images.results[0]) {
			const firstImage = images.results[0];

			htmlContent = `<figure>
				<img src='${firstImage.urls.regular}' alt='${searchedForText}'>
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`;
		} else {
			htmlContent = '<div class="error-no-image">没有找到图片</div>';
		}

		responseContainer.prepend(htmlContent);
	};

	function addArticles(articles) {
		let htmlContent = '';

		if (articles && articles.response && articles.response.docs && articles.response.docs.length >= 1) {
			htmlContent = '<ul>' +
			articles.response.docs.map(article => 
				`<li class="article">
					<h2> <a href="${article.web_url}">${article.headline.main} </a></h2>
					<p>${article.snippet}</p>
				</li>`
			).join('') + '</ul>';
		} else {
			htmlContent = '<div class="error-no-article">没找到新闻</div>'
		}

		responseContainer.append(htmlContent);
	};

}) ();