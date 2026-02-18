import { NextRequest,NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL || "https://appli-oc5h.onrender.com/appli/v1";

export async function GET(){
    try{
        const response = await fetch(`${API_BASE_URL}/jobs`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
    
        });

        const data = await response.json();
        return NextResponse.json(data,{status:response.status});

    }catch(error){
        console.error("List jobs proxy error:",error);
        return NextResponse.json({detail:[{msg:"Failed to connect to server"}]},{status:500});
    }
}