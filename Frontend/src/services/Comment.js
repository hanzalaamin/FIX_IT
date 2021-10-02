import axios from "axios";

class Comment {
	async registerComment(user_id, complaint_id, commentText) {
		console.log(commentText, complaint_id);
		const res = await axios.post(
			`/${user_id}/complaint/${complaint_id}/comment`,
			{
				commentText,
			},
			{
				body: JSON.stringify(commentText),
			}
		);
		return res.data;
	}

	async getComments(id) {
		const res = await axios.get(`complaint/${id}`);
		return res.data;
	}

	async deleteComment(user_id, complaint_id, comment_id) {
		console.log(user_id, complaint_id, comment_id);
		const res = await axios.delete(`/${user_id}/complaint/${complaint_id}/${comment_id}`);
		return res.data;
	}
}

export default new Comment();
