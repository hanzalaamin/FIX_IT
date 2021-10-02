import axios from "axios";

class Complaint {
	registerComplaint(complaintTitle, sector, category, description) {
		return axios
			.post(
				"complaint",
				{
					complaintTitle,
					sector,
					category,
					description,
				},
				{
					body: JSON.stringify(complaintTitle, sector, category, description),
				}
			)
			.then((res) => res.data);
	}
	getComplaints(id) {
		return axios.get(`${id}/complaints`).then((res) => res.data);
	}

	getAllComplaints() {
		return axios.get("/allcomplaints").then((res) => res.data);
	}

	deleteComplaint(id) {
		return axios.delete("/complaint/" + id).then((res) => res.data);
	}
}

export default new Complaint();
