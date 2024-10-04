import os

def rename_owner_files(folder_path):
    if not os.path.exists(folder_path):
        print(f"The folder {folder_path} does not exist.")
        return

    wav_files = [f for f in os.listdir(folder_path) if f.endswith('.wav')]

    wav_files.sort()

    for filename in wav_files:
        name, ext = os.path.splitext(filename)
        new_filename = f"{name}_owner{ext}"
        
        old_file = os.path.join(folder_path, filename)
        new_file = os.path.join(folder_path, new_filename)
        
        os.rename(old_file, new_file)
        print(f"Renamed: {filename} -> {new_filename}")

    print("Renaming complete!")

owner_folder = "src/data/16000_pcm_speeches/Benjamin_Netanyau"

rename_owner_files(owner_folder)