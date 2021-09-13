import axios from "axios";

class Complaint {
	registerComplaint(complaintname, sector, category, description) {
		return axios
			.post(
				"complaint",
				{
					complaintname,
					sector,
					category,
					description,
				},
				{
					body: JSON.stringify(complaintname, sector, category, description),
				}
			)
			.then((res) => res.data);
	}
	getComplaints() {
		return axios.get("/complaints").then((res) => res.data);
	}

	getAllComplaints() {
		return axios.get("/allcomplaints").then((res) => res.data);
	}

	deleteComplaint(id) {
		return axios.delete("/complaint/" + id).then((res) => res.data);
	}
}

export default new Complaint();
