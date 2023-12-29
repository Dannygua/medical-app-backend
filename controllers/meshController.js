import axios from "axios"

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDM5MjM3MDAsImlhdCI6MTcwMzg4NzczMywiYXV0aF90aW1lIjoxNzAzODg3NzAwLCJqdGkiOiIxOTQ4MGE4Zi0yMmUxLTRmMTQtOWIzZi05NzMxYjQxNTYwNmQiLCJpc3MiOiJodHRwczovL2F1dGgubWVzaGNhcGFkZS5jb20vcmVhbG1zL21lc2hjYXBhZGUtbWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzcxZjExYzItYTllYi00YjljLWIzZTEtZGY3ZTMxZDNhMTE2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVzaGNhcGFkZS1tZSIsIm5vbmNlIjoiNGE4M2UwNmQtMDgzMi00N2ViLTlmNjItNmVmM2NmMTQzZmQ2Iiwic2Vzc2lvbl9zdGF0ZSI6ImVkNjA3YzU2LWQyMzktNDIxZC04NjZlLTkwNDFmMzUxZWNmNiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZS5tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWVzaGNhcGFkZS5tZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWdjbWMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJlZDYwN2M1Ni1kMjM5LTQyMWQtODY2ZS05MDQxZjM1MWVjZjYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJCeXBhc3NHYXN0cmljbyBFQyIsInByZWZlcnJlZF91c2VybmFtZSI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJCeXBhc3NHYXN0cmljbyIsImZhbWlseV9uYW1lIjoiRUMiLCJlbWFpbCI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSJ9.d2JXUc9umwHnBOPlE0UXSEJ70ViCEJq9NmBG_iO1J18xWojV1sKbmGCylAzsEZNWAzJPlG2GR0ERMVEoy5ApVI7cf8-6tS9NozMXfznSx17lTA6jeje1G1Lswiq3zqcTC03pRrWyu-QoqIGFh25AhaB_NU77GiqKCIfYk7wbMHNhI_O6pKncES6DY8AVpcjOFW-zM6wce8Evy5X3W4OJpl8BKQzsy4yj0Wa9b7BqB1nJxZ9T9DMY_SkV4VdP3xWFS8xPWYYaxk6ATHbUMucM_IdrpwtFpzh9bwfYtOXkwbvsv8-X8MnyjYDwJYAcZcHWUN3Y8LHHcxg3F4LHg--hCg"

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