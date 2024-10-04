from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user-recordings/{user_id}")
async def upload_recordings(user_id: str, files: List[UploadFile] = File(...)):
    if len(files) != 5:
        raise HTTPException(status_code=400, detail="Exactly 5 files must be uploaded")

    save_directory = f"src/data/owner"
    os.makedirs(save_directory, exist_ok=True)

    for i, file in enumerate(files):
        file_path = os.path.join(save_directory, f"{i}_owner.wav")
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

    return {"message": "Files uploaded successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)