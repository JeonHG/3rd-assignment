window.onload = async () => {
	const app = document.querySelector("#app");
	const loading = document.createElement("p");
	loading.innerText = "Loading...";
	app.appendChild(loading);
	const main = async () => {
	// 	const {
	// 		data: {
	// 			data: { movie: data }
	// 		}
	// 	} = await axios.get(
	// 		"https://yts.lt/api/v2/movie_details.json?movie_id=2019"
	// 	);
	// 	console.log(data)

		const {
			data:{
				data: {movies: movlist}
			}
		} = await axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
		// http://hacks.mozilla.or.kr/2015/09/es6-in-depth-destructuring/
		// https://medium.com/@crunchtech/object-destructuring-best-practice-in-javascript-9c8794699a0d
		// 디스트럭쳐링 할당
		console.log(movlist);
		const row = document.createElement("div")
		// row.classList.add("row","px-5")
		row.classList.add("row")
		movlist.forEach(element => {
			const card = document.createElement("div");
			const img_div = document.createElement("div");
			const title = document.createElement("h1");
			const img = document.createElement("img");
			const genre_div = document.createElement("div");
			const desc_div = document.createElement("div");
			const synopsis = document.createElement('div');	
			const lines_ellips = document.createElement("div");
			const card_wrap = document.createElement('div')
			card_wrap.classList.add("col-md-6", 'col-sm-12')
			title.innerText = element.title
			img.src = element.medium_cover_image;
			img_div.append(img)
			img_div.classList.add("Movie__Img")
			card_wrap.setAttribute("OnClick",`location.href='https://jeonhg.github.io/3rd-assignment/detail?id=${element.id}'`)
			element.genres.forEach(item => {
				const span = document.createElement('span')
				span.innerText = item
				genre_div.append(span)
			});
			genre_div.classList.add("Movie__Genres")
			synopsis.classList.add("Movie__Synopsis")
			lines_ellips.innerText = element.synopsis
			const span_ellip = document.createElement("span")
			synopsis.append(lines_ellips)
			desc_div.append(title, genre_div, synopsis)
			desc_div.classList.add("Movie__Column")
			card.classList.add("card")
			card.append(img_div, desc_div);
			card_wrap.setAttribute("style","cursor:pointer");
			card_wrap.classList.add("card_wrap")
			card_wrap.append(card)
			row.appendChild(card_wrap);		
		});
		app.appendChild(row)
		// app.classList.add("container")
		app.removeChild(loading);
	};

	await main();
};
//https://reactgo.com/deploy-react-app-github-pages/
// https://www.npmjs.com/package/gh-pages#basic-usage