const BASE_URL = "http://localhost:4000/api";


//Login
export const loginUser=async(data)=>{
    const res=await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

//CREATE IDEA
export const createIdea =async(data,token)=>{
const res = await fetch(`${BASE_URL}/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};