// app/api/new-complaint/route.js
let incidents = []; // temporary in-memory storage

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🔔 New Incident from Koala:", body);

    const incident = {
      id: body.incidentId || body.id,
      pincode: body.pincode,
      category: body.category,
      description: body.description,
      creator: body.creator,
      timestamp: body.timestamp,
    };

    incidents.push(incident);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error parsing POST:", err);
    return new Response("Bad Request", { status: 400 });
  }
}

export async function GET() {
  return Response.json(incidents);
}
