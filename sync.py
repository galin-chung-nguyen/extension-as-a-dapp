import os
import shutil

# Define source and destination directories
popup_src = 'pages/popup/src'
options_src = 'pages/options/src'

# Function to copy and overwrite files
def copy_and_overwrite(src_dir, dest_dir):
    # Walk through all subdirectories and files in the source directory
    for root, dirs, files in os.walk(src_dir):
        # Ignore files directly in the top level of src_dir
        # Compute the relative path from the source directory
        relative_path = os.path.relpath(root, src_dir)
        dest_path = os.path.join(dest_dir, relative_path)

        # Create the corresponding directory structure in the destination
        os.makedirs(dest_path, exist_ok=True)

        # Copy each file to the destination path
        for file in files:
            src_file = os.path.join(root, file)
            dest_file = os.path.join(dest_path, file)
            shutil.copy2(src_file, dest_file)  # Copy file and metadata

    # sync src_dir/Main.* with dest_dir/Main.*
    src_main = os.path.join(src_dir, 'Main.tsx')
    dest_main = os.path.join(dest_dir, 'Main.tsx')
    shutil.copy2(src_main, dest_main)

# Call the function
copy_and_overwrite(popup_src, options_src)

print(f"All files from {popup_src} (except top-level files) have been copied to {options_src}")