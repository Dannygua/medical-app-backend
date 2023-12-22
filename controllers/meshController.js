import axios from "axios"

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDMyOTQ4NTIsImlhdCI6MTcwMzI1ODg4MywiYXV0aF90aW1lIjoxNzAzMjU4ODUyLCJqdGkiOiJkOTVjYzRmMy1lMzYzLTQxYmUtYWUzNC1jMWNlZGJjOGRiOTkiLCJpc3MiOiJodHRwczovL2F1dGgubWVzaGNhcGFkZS5jb20vcmVhbG1zL21lc2hjYXBhZGUtbWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzcxZjExYzItYTllYi00YjljLWIzZTEtZGY3ZTMxZDNhMTE2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVzaGNhcGFkZS1tZSIsIm5vbmNlIjoiODE2NjUwMjYtMTFiZS00ZjJjLThkNTktYmJmMzA0MmQ2YjAwIiwic2Vzc2lvbl9zdGF0ZSI6ImY4YzAwY2M2LTdkNTUtNGYyMC1iNGRlLWNlODZiNDVkNGFkYSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZS5tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWVzaGNhcGFkZS5tZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWdjbWMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJmOGMwMGNjNi03ZDU1LTRmMjAtYjRkZS1jZTg2YjQ1ZDRhZGEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJCeXBhc3NHYXN0cmljbyBFQyIsInByZWZlcnJlZF91c2VybmFtZSI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJCeXBhc3NHYXN0cmljbyIsImZhbWlseV9uYW1lIjoiRUMiLCJlbWFpbCI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSJ9.IoW5jHdDfO70BRWnOjdxGe0Tx1mJUys8G5auBnO_B_aN6xlj6v2ymkNRayGyjIp_1v05RARBz0vOEuCpiFPZ16GqnQ-JkrxaGkb7VhQNgLldNofvDV3Fs1VkBotXeCt8NqjbVXsfcJLiQAibiaWQAlZJahJQcXiBwr3n8coCjVRgNNCoJm88p3PC7rpc2RSjU-l28YAirCUjHM7Qd3M7cxXCnBAmyv6MlNF-0O6n__WAGNKqc3u0SNgATOkmr3ms_7KqF3QZD-vghzR3kt6sulDXJKyPwicvATdOCquiPhffUUrszCTPUXQo4yQvlTwHHtfOgiVJjW2jyN0W6zW_Og"

const createAvatar = async (req, res) => {
    try {
        const url = req.body.url

        const response = await axios({
            method: 'POST',
            url,
            headers: {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

};


const createImage = async (req, res) => {
    try {

        const url = req.body.url
        const response = await axios({
            method: 'POST',
            url,
            headers: {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

}



const fitAvatar = async (req, res) => {

    try {
        const url = req.body.url
        const data = req.body.data

        const response = await axios.post(url, data, {
            headers:  {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

}


const getAvatar = async (req, res) => {

    try {
        const url = req.body.url

        const response = await axios.get(url, {
            headers:  {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

export { createAvatar, createImage, fitAvatar, getAvatar };