#!/bin/sh

echo "--- Starting custom startup.sh (v2) ---"

# Define the target directory for node_modules
NODE_MODULES_TARGET="/home/site/node_modules_extracted" # Using a new, distinct directory
TARBALL_PATH="/home/site/wwwroot/node_modules.tar.gz"
APP_ROOT="/home/site/wwwroot"

echo "Attempting to clean and create target directory: $NODE_MODULES_TARGET"
# Attempt to remove and recreate the target directory, ignoring errors for non-existent dir
rm -rf "$NODE_MODULES_TARGET" || { echo "WARNING: Could not remove old $NODE_MODULES_TARGET."; }
mkdir -p "$NODE_MODULES_TARGET" || { echo "ERROR: Could not create $NODE_MODULES_TARGET. Exiting."; exit 1; }
echo "Directory $NODE_MODULES_TARGET ready."

echo "Checking for tarball at $TARBALL_PATH..."
if [ ! -f "$TARBALL_PATH" ]; then
    echo "ERROR: node_modules.tar.gz not found at $TARBALL_PATH. Exiting."
    exit 1
fi
echo "Tarball found. Size: $(du -sh "$TARBALL_PATH" | awk '{print $1}')"

echo "Extracting node_modules.tar.gz to $NODE_MODULES_TARGET..."
tar -xzvf "$TARBALL_PATH" -C "$NODE_MODULES_TARGET" || { echo "ERROR: Tar extraction failed. Exiting."; exit 1; }
echo "Extraction complete."

# Create a symlink from wwwroot/node_modules to the extracted location
echo "Creating symlink from $APP_ROOT/node_modules to $NODE_MODULES_TARGET..."
# Remove existing symlink or directory at wwwroot/node_modules
rm -rf "$APP_ROOT/node_modules" || true # Use || true to ignore error if not exists
ln -sfn "$NODE_MODULES_TARGET" "$APP_ROOT/node_modules" || { echo "ERROR: Could not create symlink. Exiting."; exit 1; }
echo "Symlink created."

# Set the PATH to include the local binaries (npx will find 'next' through this)
# Point PATH to the *symlinked* node_modules for consistency
export PATH="$APP_ROOT/node_modules/.bin:$PATH"
export NODE_PATH="$APP_ROOT/node_modules:$NODE_PATH" # Also set NODE_PATH for modules

echo "Attempting to start Next.js application..."
# Run the Next.js start command using npx
npx next start || { echo "ERROR: Next.js application failed to start. Exiting."; exit 1; }

echo "--- Custom startup.sh finished. ---"