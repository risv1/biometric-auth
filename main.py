import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException

app = FastAPI()

@app.post("/auth")
async def authenticate(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()

        print(f"Received file: {file.filename}, Size: {len(file_bytes)} bytes")

        print(f"First 100 bytes: {file_bytes[:100]}")

        return {"message": "Audio data received and printed."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)