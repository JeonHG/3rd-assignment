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
		const title = document.createElement("h1");
		const img = document.createElement("img");
		const desc = document.createElement("p");
		const img_div = document.createElement("div");
		const desc_div = document.createElement("div");
		const card = document.createElement("div");
		title.innerText = data.title_long;
		img.src = data.medium_cover_image;
		img_div.append(img)
		img_div.classList.add("detail_img_div")
		desc.innerText = data.description_full;
		desc.classList.add("desc")
		desc_div.classList.add("detail_desc_div")
		desc_div.append(title, desc)
		card.append(img_div, desc_div);
		card.classList.add('detail_card','container')
		app.removeChild(loading);
		app.appendChild(card);
		const link = document.createElement("a");
		link.innerText = "영화 리스트로 이동하기";
		desc_div.appendChild(link)
		link.setAttribute("href","index")
	};

	await main();
};