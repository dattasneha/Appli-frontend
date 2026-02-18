import { NextRequest,NextResponse } from "next/server";

const API_BASE_URL = process.env.API_URL || "https://appli-oc5h.onrender.com/appli/v1";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const response = await fetch(`${API_BASE_URL}/admin/jobs`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json", 
                Authorization: `Bearer ${body.token}`,
            },
            body: JSON.stringify(body),

        });
    }catch(error){
        console.error("Create job proxy error:",error);
        return NextResponse.json({detail:[{msg:"Failed to connect to server"}]},{status:500});
    }
}