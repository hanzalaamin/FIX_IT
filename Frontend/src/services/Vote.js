import axios from "axios";

class Vote {
	async likeComplaint(complaint_id) {
		console.log(complaint_id);
		const res = await axios.post(`/${complaint_id}/like`);
		return res.data;
	}

	async dislikeComplaint(complaint_id) {
		console.log(complaint_id);
		const res = await axios.delete(`/${complaint_id}/dislike`);
		return res.data;
	}
}

export default new Vote();
