import mongoose from "mongoose";

export default async function connect() {
    //const adminPassword = encodedURIComponent(process.env.PASSWORD)
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("Database Connected")
}
