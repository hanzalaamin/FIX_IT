import axios from "axios";

class Comment {
	registerComment(id, text) {
		return axios
			.post(
				`complaint/${id}/comment`,
				{
					text,
				},
				{
					body: JSON.stringify(text),
				}
			)
			.then((res) => res.data);
	}

	getComments(id) {
		return axios.get(`complaint/${id}`).then((res) => res.data);
	}
}

export default new Comment();
