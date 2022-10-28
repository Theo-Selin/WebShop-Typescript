import axios from "axios"

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchUserInfo = async () => {
  const response = await axios.get<User>(`/users/635bd89b5dfbc024f9606f4a`, { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoZW9AdGhlby5jb20iLCJzdWIiOiI2MzViZDg5YjVkZmJjMDI0Zjk2MDZmNGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY5NjM2MjQsImV4cCI6MTY2Njk2NzIyNH0.yN2AZoZtS7gHiSc-mUpGVx9PF_1zuZVYe64pzivAWmQ" } })
  const user: User = response.data
  return user
}