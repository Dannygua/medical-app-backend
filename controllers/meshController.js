import axios from "axios"

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDMxMzgwNzEsImlhdCI6MTcwMzEwMjA3MywiYXV0aF90aW1lIjoxNzAzMTAyMDcxLCJqdGkiOiJlODcxYzllYi04MmRhLTQ0ZDMtOGQ0Zi1jMjgwYjk2Y2Q3NTEiLCJpc3MiOiJodHRwczovL2F1dGgubWVzaGNhcGFkZS5jb20vcmVhbG1zL21lc2hjYXBhZGUtbWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDY0NmFkMjMtNDEwMS00NjQ2LTg1YWEtMjZkZTQ5MDVjZmY5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVzaGNhcGFkZS1tZSIsIm5vbmNlIjoiY2JlNmM2ZTQtMjYyYS00M2VhLTlmZTItMThkZGEwYTRhZGY3Iiwic2Vzc2lvbl9zdGF0ZSI6ImVjZWI3ZDdlLWU4ZjEtNDFlMC04OTY4LTY1YThmYWM5YjQ4ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZS5tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWVzaGNhcGFkZS5tZSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWdjbWMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJlY2ViN2Q3ZS1lOGYxLTQxZTAtODk2OC02NWE4ZmFjOWI0OGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJEb2N0b3IgQmFyaWF0cmljbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImRyYmFyaWF0cmljbzI1MEBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiRG9jdG9yIiwiZmFtaWx5X25hbWUiOiJCYXJpYXRyaWNvIiwiZW1haWwiOiJkcmJhcmlhdHJpY28yNTBAZ21haWwuY29tIn0.A2fTct9ggdZ1F4UnjV3zJQYRpk2wOZYpgRZfgNG2TgCNIexnNbeMvPpion15mty_ZeNXwycBFNkYvHyOGtP7QlHicm5MoWbZw9pJuw-unyG92och8u82PVl75cXCnwFM-jr9CBIylyK9DzJlNHOqN8b2HqP-HDaAW3fwNrE2IfJTFn-7TjM-Ii3456cWeR6Loa4s2TTwdzOptIeMjThT3hdOnDzfQ7iOIZ7no1chl8RJoH3iLbxSU_Pu-4hQ06y-LVR84i2i1wsbzgqbN3I69ne3HMcTMrsFzHIdUPzwuQ0GEss82IkeoErYNWK9nriCoVfTvHmKAFsVAwWjYAhzHA"
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