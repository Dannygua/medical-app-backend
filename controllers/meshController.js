import axios from "axios"

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDMxNDU4MTAsImlhdCI6MTcwMzEwOTg5NSwiYXV0aF90aW1lIjoxNzAzMTA5ODEwLCJqdGkiOiIxMjI4NmQxYy1jNmQ4LTQ5MjMtODA0ZS1kZTllNmI5N2FhMjUiLCJpc3MiOiJodHRwczovL2F1dGgubWVzaGNhcGFkZS5jb20vcmVhbG1zL21lc2hjYXBhZGUtbWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzcxZjExYzItYTllYi00YjljLWIzZTEtZGY3ZTMxZDNhMTE2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVzaGNhcGFkZS1tZSIsIm5vbmNlIjoiMGNjZDIyMjYtMzMyOC00MjFlLThjNjAtZjA4OGUxMzA4MGY1Iiwic2Vzc2lvbl9zdGF0ZSI6IjJjOTc2NGU5LTMxMDctNDgxOC05YjhmLTk4OTNlNmZmMzZjNyIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZS5tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWVzaGNhcGFkZS5tZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWdjbWMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIyYzk3NjRlOS0zMTA3LTQ4MTgtOWI4Zi05ODkzZTZmZjM2YzciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJCeXBhc3NHYXN0cmljbyBFQyIsInByZWZlcnJlZF91c2VybmFtZSI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJCeXBhc3NHYXN0cmljbyIsImZhbWlseV9uYW1lIjoiRUMiLCJlbWFpbCI6InBhYmxvd3dlMjAxMUBob3RtYWlsLmNvbSJ9.Pjzp7KB_fcq2d5vLWLQyahq3vm0A5esQUSvxmO7lcvt8YypMSEZfgn45YDlEmdzJItNMjNH3x4pMXsU2CPMdiCyWIe0XoUHIhp4NlLrEoOyX4z1xtu5kHxmVF8iyPYZwfyLJwRxeJxKIkitWh-ceeilaHA9Yorl8rK71PQd4VhoZlv3uz5-FUhc0-s0b-tmtF7UITmfAlr6ZxycoRdyxTBx3ZwW0vbevN6UGfWHf1uGdpl785kMUp573adZ1dCcMOaBg9pv5Lwypbbpk88E8KPZZd9w9yLmDdthU1abEnG2CeiOPVu0SIfbfX7-0Lxf0bk_Fx3yt8_KOtG5Zxj25RA"

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