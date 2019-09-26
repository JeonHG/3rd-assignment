function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}
// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
window.onload = async () => {
	const app = document.querySelector("#app");
	const loading = document.createElement("p");
	loading.innerText = "Loading...";
    app.appendChild(loading);
    const para = getUrlParams()
    const id = para['id']
	const main = async () => {
		const {
			data:{
				data: {movie: data}
			}
		} = await axios.get(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}`)
		console.log(data);
		const title = document.createElement("p");
		const img = document.createElement("img");
		const desc = document.createElement("p");
		title.innerText = data.title_long;
		img.src = data.medium_cover_image;
		desc.innerText = data.description_full;
		const card = document.createElement("p");
		card.append(img, title, desc);
		app.removeChild(loading);
		app.appendChild(card);
	};

	await main();
};